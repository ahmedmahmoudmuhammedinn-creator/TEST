import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

export interface AIChatBotHandle {
  askAI: (message: string) => void;
}

const AIChatBot = forwardRef<AIChatBotHandle, {}>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi there! I'm the LI N C O AI consultant. How can I help optimize your business technology today?",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      try {
        chatSessionRef.current = createChatSession();
      } catch (e) {
        console.error("Failed to init chat", e);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    // Ensure chat session is initialized if we are forcing a message without opening manually first
    if (!chatSessionRef.current) {
        try {
            chatSessionRef.current = createChatSession();
        } catch (e) {
            console.error("Failed to init chat", e);
            return;
        }
    }

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const stream = await sendMessageStream(chatSessionRef.current, userMsg.text);
      
      let fullResponse = "";
      // Create a placeholder message for the model
      setMessages(prev => [...prev, { role: 'model', text: "", timestamp: Date.now() }]);

      for await (const chunk of stream) {
        const contentResponse = chunk as GenerateContentResponse;
        const text = contentResponse.text || "";
        fullResponse += text;
        
        // Update the last message with the accumulating response
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    await processMessage(text);
  };

  useImperativeHandle(ref, () => ({
    askAI: (message: string) => {
      setIsOpen(true);
      processMessage(message);
    }
  }));

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 text-white rotate-90' : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] h-[70vh] transition-all duration-300 animate-fade-in-up">
          {/* Header */}
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">LI N C O AI</h3>
              <p className="text-xs text-cyan-400">Intelligent IT Consultant</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-700' : 'bg-blue-600'
                  }`}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-700 text-white rounded-tr-none'
                      : 'bg-gradient-to-br from-blue-900/50 to-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
                  }`}
                >
                   {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs ml-12">
                <Loader2 size={12} className="animate-spin" />
                <span>LI N C O AI is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about cloud, security, or dev..."
                className="w-full bg-slate-900 border border-slate-600 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-slate-500">
              AI can make mistakes. Consider checking important info.
            </div>
          </div>
        </div>
      )}
    </>
  );
});

AIChatBot.displayName = 'AIChatBot';

export default AIChatBot;