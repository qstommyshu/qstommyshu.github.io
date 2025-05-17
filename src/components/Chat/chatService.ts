import { Message } from "./ChatContext";

// Define response type
export interface ChatResponse {
  answer: string;
  sources: string[];
}

// The API endpoint
const API_URL =
  "https://bc88e69a-08d3-4d3c-a95c-89ef3d5cdd92-00-17wwmwci1dwd6.janeway.replit.dev/chat";

/**
 * Sends a chat message to the API and returns the response
 * @param messages - The current chat history
 * @param question - The user's question to send
 * @returns Promise with the API response
 */
export async function sendChatMessage(
  messages: Message[],
  question: string
): Promise<{ success: boolean; data?: ChatResponse; error?: string }> {
  try {
    // Prepare the request payload
    const payload = {
      history: messages,
      question,
    };

    // Send POST request to the server
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // Parse the response
    const data: ChatResponse = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching response from server:", error);
    return {
      success: false,
      error:
        "I'm sorry, I encountered an error while processing your request. Please try again later.",
    };
  }
}
