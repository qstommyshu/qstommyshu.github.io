import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import { useChat } from "./ChatContext";
import { sendChatMessage } from "./chatService";

function Chatbar() {
  const [message, setMessage] = useState("");
  const { messages, addMessage, isLoading, setIsLoading, showChat } = useChat();

  // Function to show the chat panel when clicking on the chat input
  const handleInputFocus = () => {
    showChat();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { content: message, role: "human" as const };
    addMessage(userMessage);
    setMessage("");

    // Ensure chat is visible
    showChat();

    // Start loading state
    setIsLoading(true);

    // Send message using shared service
    const result = await sendChatMessage(messages, userMessage.content);

    if (result.success && result.data) {
      // Add AI response to chat with the answer and sources
      addMessage({
        content: result.data.answer,
        role: "ai",
        sources: result.data.sources,
      });
    } else {
      // Add error message to chat
      addMessage({
        content: result.error || "An unexpected error occurred",
        role: "ai",
      });
    }

    // End loading state
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="flex items-center h-12 px-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={handleInputFocus}
            onClick={handleInputFocus}
            placeholder="Ask our AI assistant about Tommy's Space..."
            className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            disabled={isLoading}
            onClick={handleInputFocus}
          ></button>
          <button
            type="submit"
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full ml-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            disabled={!message.trim() || isLoading}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chatbar;
