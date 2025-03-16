"use client";
import { useState, useEffect, useRef } from "react";
import Layout from "../layout/page";
import axios from "axios";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import talkWithAi from "../../public/talkWithAi.jpg";

// Speech Recognition Component
const  SpeechRecognitionComponent = ({ onTranscript }) => {
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognitionAPI =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognitionAPI) {
        const recognitionInstance = new SpeechRecognitionAPI();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error:", event);
          setError("Speech recognition error occurred.");
        };

        setRecognition(recognitionInstance);
      } else {
        setError("Speech recognition is not supported in this browser.");
      }
    }
  }, [onTranscript]);

  return (
    <div className="flex flex-row gap-2">
      <Image src={talkWithAi} alt="AI Interaction" width={96} height={104} className="rounded-lg" />
      <button
        onClick={() => recognition?.start()}
        className="bg-accentPurple h-10 mt-5 text-white py-2 px-4 rounded-lg"
      >
        Start Speaking
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

// Main Chat Component
const TalkWithAi =  () => {
  const [messages, setMessages] = useState([]); // Store chat history
  const chatBoxRef = useRef(null);

  // Auto-scroll to the user's request when a new message is added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = 0; // Always move to the top (where the latest user message is)
    }
  }, [messages]);

  const handleTranscript = async (transcript) => {
    // Add the user's message first
    setMessages((prevMessages) => [{ user: transcript, ai: null }, ...prevMessages]);

    try {
      // Prepare chat history for AI prompt
      const chatHistory = messages.map((msg) => `User: ${msg.user}\nAI: ${msg.ai}`).join("\n");
      const prompt = `Previous conversations:\n${chatHistory}\n\nUser request: "${transcript}"`;

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gemini`, { text: prompt });
      const aiResponse = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      // Update the AI response in the same message object
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[0] = { user: transcript, ai: aiResponse };
        return updatedMessages;
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center p-4 w-full">
        {/* Speech Recognition */}
        <SpeechRecognitionComponent onTranscript={handleTranscript} />

        {/* Chat Box */}
        <div
          ref={chatBoxRef}
          className="w-[90%] pb-20 bg-gray-900 text-gray-300 p-5 rounded-lg shadow-md min-h-[500px] max-h-[70vh] overflow-y-auto flex flex-col-reverse"
        >
          {messages.map((msg, index) => (
            <div key={index} className="mb-4 flex flex-col">
              {/* User Message (Always on top) */}
              <div className="self-start bg-gray-700 text-white py-2 px-4 rounded-lg w-fit max-w-[80%]">
                <p className="font-semibold">You:</p>
                <p>{msg.user}</p>
              </div>

              {/* AI Response (Below user message) */}
              {msg.ai && (
                <div className="self-end bg-gray-800 text-white pt-2 pb-20 px-4 rounded-lg w-fit max-w-[80%] ml-auto mt-2">
                  <p className="font-semibold text-blue-400">AI:</p>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
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
                    }}
                  >
                    {msg.ai}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default talkWithAi