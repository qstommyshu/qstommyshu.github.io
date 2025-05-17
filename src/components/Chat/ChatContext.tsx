import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export type Message = {
  content: string;
  role: "human" | "ai";
  sources?: string[]; // Optional sources array for AI messages
};

type ChatContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isChatVisible: boolean;
  showChat: () => void;
  hideChat: () => void;
  refreshChat: () => void;
};

// Create a unique key for localStorage using a combination of user's browser fingerprint
const generateChatStorageKey = (): string => {
  const userAgent = navigator.userAgent;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // Simple fingerprint based on user's browser data
  const fingerprint = `${userAgent}-${timeZone}-${screenWidth}x${screenHeight}`;
  return `tommys-space-chat-${fingerprint}`;
};

const STORAGE_KEY = generateChatStorageKey();

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  // Initialize messages from localStorage or empty array
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
      console.error("Error loading chat history from localStorage:", error);
      return [];
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat history to localStorage:", error);
    }
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
    showChat(); // Show chat when a message is added
  };

  const showChat = () => setIsChatVisible(true);
  const hideChat = () => setIsChatVisible(false);

  const refreshChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing chat history from localStorage:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isLoading,
        setIsLoading,
        isChatVisible,
        showChat,
        hideChat,
        refreshChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
