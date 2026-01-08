import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const createChatSession = (): Chat => {
  const instance = getAIInstance();
  return instance.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the AI Consultant for LI N C O, a premium IT services provider. 
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
      Keep responses concise (under 100 words unless technical detail is asked).`,
    },
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};