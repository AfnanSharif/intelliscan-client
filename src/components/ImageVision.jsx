"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Trash } from "lucide-react";
import Image from "next/image"; // Importing next/image
import Markdown from "react-markdown";

const ImageVision = () => {
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(
    "Hello! I am your assistant. Feel free to ask me anything."
  );

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [text]);

  async function handleRequest() {
    setLoading(true);
    setText("Processing...");
    setInput("");
    try {
      // Simulate an API request or some processing
      setTimeout(() => {
        setText("This is a placeholder response.");
        setLoading(false);
      }, 1000);
    } catch (error) {
      setText("Oops! Something went wrong.");
      setLoading(false);
      console.error("Error:", error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRequest();
    }
  }

  return (
    <div className="relative flex px-2 justify-center max-w-3xl min-h-dvh w-full pt-6 bg-gray-900 rounded-t-3xl max-h-screen shadow shadow-slate-900">
      <div className="flex text-sm md:text-base flex-col pt-10 pb-16 w-full flex-grow flex-1 rounded-3xl shadow-md overflow-y-auto">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-6 md:w-10 rounded-full">
              <Image
                alt="Placeholder"
                src="/placeholder-image.jpg" // Replace with your actual image path
                width={50}
                height={50}
                className="rounded-full" // Optional styling
              />
            </div>
          </div>
          <div className="chat-header mx-2 font-semibold opacity-80">
            Assistant
          </div>
          <div className="chat-bubble font-medium chat-bubble-primary">
            {loading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              <Markdown>{text}</Markdown>
            )}
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute px-2 bottom-2 w-full flex gap-1">
        <button
          className="btn btn-outline shadow-md btn-error rounded-3xl backdrop-blur"
          onClick={() => setText("Hello! I am your assistant. Feel free to ask me anything.")}
        >
          <Trash />
        </button>
        <textarea
          type="text"
          value={input}
          required
          rows={1}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="textarea backdrop-blur textarea-primary w-full mx-auto bg-opacity-60 font-medium shadow rounded-3xl"
        />
        <button
          className={`btn rounded-3xl shadow-md ${
            loading
              ? "btn-accent cursor-wait pointer-events-none"
              : "btn-primary"
          }`}
          title="send"
          onClick={handleRequest}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <Send />
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageVision;
