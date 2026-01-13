
import { ChatMessage } from "../types";
// Fix: Import GoogleGenAI and Chat type to support client-side AI interactions in the frontend
import { GoogleGenAI, Chat } from "@google/genai";

// Fix: Maintains the existing fetch-based chat function for components using the backend proxy
export const askLincoAI = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.reply || 'Failed to fetch response from AI');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error in askLincoAI:", error);
    throw error;
  }
};

// Fix: Defined a standard system instruction to ensure consistent AI behavior across different chat implementations
const SYSTEM_INSTRUCTION = `You are the AI Consultant for LI N C O, a premium IT services provider. 
Your goal is to assist potential clients by understanding their business needs and recommending our services.

Our Services:
1. Cloud Migration & Management (AWS/Azure/GCP)
2. Cybersecurity Audits & Defense
3. Custom Software Development (Web/Mobile)
4. IT Support & Managed Services
5. Data Analytics & Business Intelligence

Contact Information for Reference:
- Address: Maadi 9 street, Cairo, Egypt
- Phone: +20 11 40073905
- Email: Info@linco.network
- Website: linco.network

Tone: Professional, knowledgeable, yet accessible and friendly. 
Do not make up pricing. Suggest scheduling a consultation with a human expert for quotes.
Keep responses concise (under 100 words).`;

// Fix: Added createChatSession to resolve the "no exported member" error in AIChatBot.tsx
export const createChatSession = (): Chat => {
  // Initializing the GenAI client with the provided API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
};

// Fix: Added sendMessageStream to resolve the "no exported member" error in AIChatBot.tsx
export const sendMessageStream = async (chat: Chat, message: string) => {
  // Forwarding the stream request to the underlying chat instance
  return await chat.sendMessageStream({ message });
};
