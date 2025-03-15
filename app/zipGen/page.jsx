"use client";

import { useState } from "react";
import { Layout } from "../layout/page";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const [messages, setMessages] = useState([]); // Store chat history
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const sendRequest = async () => {
    if (!userInput.trim()) {
      setErrors({ message: "Please enter a request." });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Construct chat history as context for the AI
      const chatHistory = messages.map((msg) => `User: ${msg.user}\nAI: ${msg.ai}`).join("\n");
      const prompt = `Previous conversations:\n${chatHistory}\n\nUser request: "${userInput}"`;

      const res = await axios.post("http://localhost:5000/api/gemini", { text: prompt });
      const aiResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Update chat history with new messages
      setMessages([...messages, { user: userInput, ai: aiResponse }]);
      setUserInput(""); // Clear input field
    } catch (error) {
      console.error("Error:", error);
      setErrors({ message: "Error fetching response" });
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex flex-col w-full items-center p-6">
        {/* Chat Box */}
        <div className="w-[90%] bg-gray-900 text-gray-300 p-5 rounded-lg shadow-md min-h-[500px] max-h-[70vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-4">
              {/* User Message (Left) */}
              <div className="self-start bg-gray-700 text-white py-2 px-4 rounded-lg w-fit max-w-[80%]">
                <p className="font-semibold">You:</p>
                <p>{msg.user}</p>
              </div>

              {/* AI Response (Right) */}
              <div className="self-end bg-gray-800 text-white py-2 px-4 rounded-lg w-fit max-w-[80%] ml-auto mt-2">
                <p className="font-semibold text-blue-400">AI:</p>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-bold my-4 text-accentPurple" {...props} />
                      ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold my-3 text-accentPurple" {...props} />
                      ),
                    p: ({ node, ...props }) => <p className="text-gray-300 my-2" {...props} />,
                    pre: ({ node, ...props }) => (
                      <div className="bg-gray-800 text-white p-4 rounded-md my-5" {...props} />
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
                        <table className="table-auto w-full border-collapse border border-gray-500 rounded-lg" {...props} />
                      ),
                    th: ({ node, ...props }) => (
                        <th className="px-4 py-2 border border-gray-600 bg-gray-700 text-white" {...props} />
                      ),
                    td: ({ node, ...props }) => (
                        <td className="px-4 py-2 border border-gray-600 text-gray-300" {...props} />
                    ),
                    a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {children}
                        </a>
                      ),
                  }}
                >
                  {msg.ai}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* User Input Section */}
        <div className="w-[90%] bg-gray-900 p-5 rounded-lg mt-5">
          <textarea
            rows={4}
            className="w-full rounded-lg text-gray-200 bg-gray-700 p-3 outline-none"
            placeholder="Enter your request here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
          {errors.message && <p className="text-red-500 mt-2">{errors.message}</p>}
        </div>

        {/* Generate Button */}
        <div className="mt-4">
          <button
            onClick={sendRequest}
            className="bg-accentPurple px-4 py-2 rounded-lg text-white"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
