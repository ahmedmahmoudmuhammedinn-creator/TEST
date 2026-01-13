import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { askLincoAI } from '../services/geminiService';

export interface LincoChatHandle {
  askAI: (message: string) => void;
}

const LincoChat = forwardRef<LincoChatHandle, {}>((props, ref) => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Map frontend messages to backend format
      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.text
      }));

      const reply = await askLincoAI(apiMessages);
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: reply, 
        timestamp: Date.now() 
      }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I'm having trouble connecting right now. Please try again later.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-slate-700 text-white rotate-90' : 'bg-gradient-to-r from-brand-primary to-emerald-600 text-black font-bold'
        }`}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[calc(100%-3rem)] max-w-sm bg-slate-900 border border-brand-primary/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px] h-[70vh] transition-all duration-300 animate-fade-in">
          <div className="p-4 bg-slate-800 border-b border-brand-primary/10 flex items-center space-x-3">
            <div className="p-2 bg-brand-primary rounded-lg">
              <Sparkles size={20} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-white tracking-tight">LINCO AI</h3>
              <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest">Intelligent Consultant</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-slate-700' : 'bg-brand-primary'
                  }`}
                >
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-black" />}
                </div>
                <div
                  className={`p-3 rounded-2xl text-sm max-w-[80%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-slate-800 text-white rounded-tr-none border border-white/5'
                      : 'bg-brand-primary/5 border border-brand-primary/20 text-slate-200 rounded-tl-none'
                  }`}
                >
                   {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-brand-primary/60 text-[10px] font-bold uppercase tracking-widest ml-12">
                <Loader2 size={12} className="animate-spin" />
                <span>Processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-900 border-t border-brand-primary/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask our AI Agent..."
                className="w-full bg-black/60 border border-brand-primary/20 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-brand-primary transition-all placeholder:text-slate-600"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-brand-primary hover:text-brand-hover disabled:opacity-30 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

LincoChat.displayName = 'LincoChat';

export default LincoChat;
