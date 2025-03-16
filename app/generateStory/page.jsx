"use client";
import { useState } from "react";
import Layout from "../layout/page";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Home = () => {
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [userInput, setUserInput] = useState("");

  const sendRequest = async () => {
    if (!userInput.trim()) {
      setErrors({ message: "Please enter a request for the AI." });
      return;
    }

    setLoading(true);
    setErrors({});
    try {
      const prompt = `
      The user provided the following request: "${userInput}".  
      
      **Step 1: Analyze the intent of the request.**  
      - If the request is **not about generating a story**, respond:  
        "I am responsible for creating stories only. Please enter a request for a story."  
      
      **Step 2: If the request is for a story:**  
      - Generate a **well-structured, engaging story** using **simple English with medium-level verbs**.  
      - The first line must be the **title** (without any extra words).  
      - Ensure the story has a **clear beginning, middle, and end**.  
      - The response must contain **only the story** (no explanations). 
      -and make sure the title it has been bolded and it in h2 and dont add anything that are not story part 
      `;

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gemini`, { text: prompt });
      setResponseText(res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response");
    } catch (error) {
      console.error("Error:", error);
      setResponseText("Error fetching response");
    }
    setLoading(false);
  };

  console.log(responseText)

  return (
    <Layout>
      <div className="flex flex-col w-full items-center p-6">
        {/* Generated Story Section */}
        <div className="relative w-[80%] pb-[20%] h-[90vh] bg-gray-900 text-gray-300 p-5 rounded-lg shadow-md overflow-y-scroll">
          <h3 className="text-lg font-semibold text-accentPurple">Generated Story:</h3>

          {responseText && (
            <div className="border p-4 bg-gray-800 rounded-lg mt-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-2xl font-bold my-4 text-accentPurple text-center" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold my-3 text-accentPurple underline" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300 my-2 leading-relaxed" {...props} />
                  ),
                  pre: ({ node, ...props }) => (
                    <div className="bg-gray-900 text-white p-4 rounded-md my-5 overflow-x-auto" {...props} />
                  ),
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-700 text-yellow-400 px-1 rounded" {...props}>
                        {children}
                      </code>
                    );
                  },
                  table: ({ node, ...props }) => (
                    <table className="table-auto w-full border-collapse border border-gray-500 rounded-lg my-4" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-4 py-2 border border-gray-600 bg-gray-700 text-white" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-4 py-2 border border-gray-600 text-gray-300" {...props} />
                  ),
                }}
              >
                {responseText}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* User Input Section */}
        <div className="absolute top-[67%] flex flex-row right-[8%] w-[63%] bg-gray-900 p-5 rounded-lg mt-5">
          <textarea
            rows={3}
            className="w-[90%] rounded-lg text-gray-200 bg-gray-700 p-3 outline-none"
            placeholder="Enter your story request here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          
          <div className="mt-4 absolute w-[5%] top-[50%] right-[5%] ">
          <button
            onClick={sendRequest}
            className="bg-accentPurple px-4 py-2 rounded-lg text-white"
            disabled={loading}
          >
            {loading ? "Send..." : "Send"}
          </button>
        </div>
          {errors.message && <p className="text-red-500 mt-2">{errors.message}</p>}
        </div>

        {/* Generate Button */}
        
      </div>
    </Layout>
  );
}

export default Home;