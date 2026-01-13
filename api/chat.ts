
import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "edge",
};

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

export default async function handler(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { messages } = await req.json();
    
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable is not configured.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Transform messages to Gemini content format
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content || m.text }],
    }));

    // Fix: Removed maxOutputTokens to follow SDK recommendations and avoid unnecessary thinking budget complexity for simple text tasks
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(
      JSON.stringify({ 
        reply: "Sorry, I encountered an issue processing your request.", 
        error: error.message 
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
