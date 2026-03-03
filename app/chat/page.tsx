"use client"

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser, FaTrash } from "react-icons/fa";
import { BsFillChatQuoteFill } from "react-icons/bs";
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};
const formattedTime = new Date().toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}).toUpperCase();
export default function ChatPage() {
const [messages, setMessages] = useState<Message[]>([
  {
    id: `${Date.now()}-${Math.random()}`,
    role: "assistant",
    content:
      "Hi! I'm an AI assistant for Pankaj Kushwaha's portfolio. Feel free to ask me anything about his skills, experience, projects, or background. How can I help you today?",
    timestamp: formattedTime,
  },
]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e:any) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}-${Math.random()}`,
      role: "user" as const,
      content: inputMessage,
      timestamp: formattedTime
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: inputMessage }
          ]
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        role: "assistant" as const,
        content: data.message || data.error || "Sorry, I couldn't get a response.",
        timestamp: formattedTime
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        role: "assistant" as const,
        content: "Sorry, something went wrong. Please try again.",
        timestamp: formattedTime
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: "Hi! I'm an AI assistant for Pankaj Kushwaha's portfolio. Feel free to ask me anything about his skills, experience, projects, or background. How can I help you today?",
        timestamp: formattedTime
      }
    ]);
  };
  console.log(messages,"==>")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0f0f1a] to-black text-white pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4">
            <BsFillChatQuoteFill className="text-4xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Chat with AI
          </h1>
          <p className="text-gray-400 mt-2">
            Ask anything about Pankaj Kushwaha - Skills, Experience, Projects & More
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 overflow-hidden shadow-2xl"
        >
          {/* Messages Area */}
          <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
            {messages?.length>0 && messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message?.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-indigo-600" : "bg-gradient-to-r from-indigo-600 to-purple-600"
                  }`}>
                    {message.role === "user" ? (
                      <FaUser className="text-white" size={18} />
                    ) : (
                      <FaRobot className="text-white" size={18} />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-5 py-3 ${
                      message?.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message?.content}</p>
                    <p className={`text-xs mt-2 ${message?.role === "user" ? "text-white/60" : "text-gray-400"}`}>
                      {message?.timestamp}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                    <FaRobot className="text-white" size={18} />
                  </div>
                  <div className="bg-gray-700 rounded-2xl px-5 py-4">
                    <div className="flex gap-1">
                      {[0, 0.1, 0.2].map((delay, i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                          className="w-3 h-3 bg-gray-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-900/50 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about Pankaj Kushwaha..."
                className="flex-1 bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-600 focus:border-indigo-500 focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <motion.button
                type="button"
                onClick={handleClearChat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-colors"
                title="Clear Chat"
              >
                <FaTrash />
              </motion.button>
              <motion.button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-xl transition-colors"
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Quick Questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-wrap gap-2 justify-center"
        >
          {[
            "What are Pankaj's skills?",
            "Tell me about his experience",
            "What projects has he worked on?",
            "How to contact him?"
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => {
                setInputMessage(question);
              }}
              className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-indigo-500 rounded-full text-sm text-gray-300 hover:text-white transition-all"
            >
              {question}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
