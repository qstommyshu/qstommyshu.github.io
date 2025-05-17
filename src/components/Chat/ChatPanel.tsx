import React, { useRef, useEffect } from "react";
import { useChat } from "./ChatContext";
import {
  Github,
  Minimize2,
  RefreshCw,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { sendChatMessage } from "./chatService";

function ChatPanel() {
  const {
    messages,
    addMessage,
    isLoading,
    setIsLoading,
    isChatVisible,
    hideChat,
    refreshChat,
  } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollableAreaRef = useRef<HTMLDivElement>(null);

  // Handle sending a suggested message
  const handleSendSuggestedMessage = async (message: string) => {
    if (isLoading) return;

    // Add user message to chat
    const userMessage = { content: message, role: "human" as const };
    addMessage(userMessage);

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

  // Handle clicks outside the chat panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't minimize when clicking inside the chat panel
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        // Check if the click is on or inside the chatbar (which has class 'fixed bottom-4')
        const chatbarElement = document.querySelector(".fixed.bottom-4");
        if (chatbarElement && !chatbarElement.contains(event.target as Node)) {
          hideChat();
        }
      }
    };

    // Only add the event listener if the chat is visible
    if (isChatVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatVisible, hideChat]);

  // Capture wheel events to ensure scrolling works when clicking on messages
  useEffect(() => {
    const scrollableArea = scrollableAreaRef.current;

    if (!scrollableArea) return;

    const handleWheel = (e: WheelEvent) => {
      // If the mouse is over the scrollable area, prevent default scrolling
      // and manually scroll the chat panel
      const rect = scrollableArea.getBoundingClientRect();
      const isMouseOverPanel =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isMouseOverPanel) {
        e.preventDefault();
        scrollableArea.scrollTop += e.deltaY;
      }
    };

    // Add the event listener with the passive option set to false to allow preventDefault
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [isChatVisible]);

  // Set header height on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      // Just accessing the ref to keep the header properly rendered
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        console.log("Header height:", height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Only hide panel if not visible
  if (!isChatVisible) {
    return null;
  }

  // Define suggested questions
  const suggestedQuestions = [
    "What is Tommy's professional experience?",
    "What projects has Tommy worked on?",
    "What technologies is Tommy skilled in?",
  ];

  return (
    <div className="fixed bottom-20 left-0 right-0 z-40 flex justify-center">
      <div
        ref={panelRef}
        className="w-11/12 max-w-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg max-h-[70vh] flex flex-col"
      >
        {/* Fixed Header */}
        <div
          ref={headerRef}
          className="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 rounded-t-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-medium text-gray-900 dark:text-white flex items-center"></div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={refreshChat}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Refresh conversation"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={hideChat}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Minimize chat"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Chat Messages */}
        <div
          ref={scrollableAreaRef}
          className="p-4 overflow-y-auto flex-1 touch-auto"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {messages.length === 0 ? (
            // Empty state - display a message when no chat history
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full mb-4">
                <MessageSquare
                  size={24}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No messages yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Your chat history is empty. Feel free to ask questions about
                Tommy's experience, projects, skills, or anything else you'd
                like to know!
              </p>
              <div className="space-y-2 text-left w-full max-w-md">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try asking:
                </p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendSuggestedMessage(question)}
                    disabled={isLoading}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-left">{question}</span>
                    <ChevronRight
                      size={16}
                      className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Display messages if there are any
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.role === "human" ? "text-right" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "human"
                      ? "inline-block text-right"
                      : "w-full"
                  } ${
                    message.role === "human"
                      ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {message.role === "human" ? (
                    // For human messages, just split by paragraphs
                    message.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    // For AI messages, render as markdown
                    <div className="markdown-content">
                      <ReactMarkdown
                        rehypePlugins={[rehypeSanitize]}
                        components={{
                          // Make links open in a new tab
                          a: (props) => (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            />
                          ),
                          // Style headings
                          h3: (props) => (
                            <h3
                              {...props}
                              className="text-lg font-semibold mt-3 mb-2"
                            />
                          ),
                          // Style paragraphs
                          p: (props) => <p {...props} className="mb-2" />,
                          // Style lists
                          ul: (props) => (
                            <ul {...props} className="pl-6 mb-2 list-disc" />
                          ),
                          li: (props) => <li {...props} className="mb-1" />,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}

                  {/* Sources section for AI messages */}
                  {message.role === "ai" &&
                    message.sources &&
                    message.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div className="text-xs text-gray-500 uppercase font-semibold mb-2">
                          SOURCES
                        </div>
                        {message.sources.map((source, idx) => (
                          <div
                            key={idx}
                            className="mb-2 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-2 flex items-center"
                          >
                            <Github
                              size={16}
                              className="mr-2 text-gray-700 dark:text-gray-300"
                            />
                            <a
                              href={source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm hover:underline text-blue-600 dark:text-blue-400"
                            >
                              {source.includes("github.com")
                                ? source.split("github.com/")[1] || source
                                : source}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex items-center mb-2">
              <div className="ml-2">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
