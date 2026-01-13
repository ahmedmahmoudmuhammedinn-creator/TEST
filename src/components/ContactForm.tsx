import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, User, Mail, Building, Phone } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    honeypot: '' 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (formData.honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Defensive Parsing: Read text first to handle 500/HTML error pages from Vercel/Edge
      const rawText = await response.text();
      let result;

      try {
        result = JSON.parse(rawText);
      } catch (parseErr) {
        console.error('Non-JSON response received:', rawText);
        throw new Error(rawText.length > 100 ? `Server Error (${response.status})` : rawText);
      }

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || `Transmission failed with status ${response.status}`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('Submission Debug Info:', err);
      // Clean up common Vercel HTML error markers if they leaked through
      const cleanMessage = err.message.includes('<!DOCTYPE') 
        ? 'A server-side configuration error occurred. Please try again later or contact us directly at info@linco.network.' 
        : err.message;
        
      setErrorMessage(cleanMessage);
      setStatus('error');
    }
  };

  const inputStyles = "w-full bg-black/60 border border-brand-primary/20 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50 group-hover:border-brand-primary/40";

  if (status === 'success') {
    return (
      <div className="glass-card p-12 rounded-[2.5rem] text-center border-brand-primary animate-fade-in shadow-[0_0_60px_rgba(16,185,129,0.1)]">
        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-brand-primary" />
        </div>
        <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase italic">Transmission Received</h3>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto leading-relaxed">
          Your project parameters have been uploaded to our secure systems. A senior technical consultant will review and respond within 24 hours.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px] hover:text-brand-hover transition-all border-b border-brand-primary/20 pb-1"
        >
          Initiate New Transmission
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-10 md:p-20 rounded-[3rem] relative overflow-hidden group border-white/5 shadow-2xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[140px] pointer-events-none rounded-full group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
      
      <div className="relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-8">
            Global Lead Routing System
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.8] italic">
            Architect <br/><span className="text-brand-primary">Excellence.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mt-10 font-medium">Connect with our architecture team to deploy your next high-performance infrastructure.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="text" 
            className="hidden" 
            tabIndex={-1} 
            autoComplete="off" 
            value={formData.honeypot} 
            onChange={e => setFormData({...formData, honeypot: e.target.value})} 
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group/field">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40 group-focus-within/field:text-brand-primary transition-colors" />
              <input required type="text" placeholder="Identity / Full Name" className={inputStyles} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="relative group/field">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40 group-focus-within/field:text-brand-primary transition-colors" />
              <input required type="email" placeholder="Professional Email" className={inputStyles} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group/field">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40 group-focus-within/field:text-brand-primary transition-colors" />
              <input type="text" placeholder="Organization (Optional)" className={inputStyles} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <div className="relative group/field">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40 group-focus-within/field:text-brand-primary transition-colors" />
              <input type="tel" placeholder="Callback Number" className={inputStyles} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div className="relative group/field">
            <textarea 
              required 
              placeholder="Technical requirements or mission profile..." 
              rows={5} 
              className="w-full bg-black/60 border border-brand-primary/20 rounded-xl p-6 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50 resize-none group-hover:border-brand-primary/40" 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={status === 'submitting'} 
            className="w-full bg-brand-primary text-black font-black py-7 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-hover transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(16,185,129,0.25)] relative overflow-hidden group/btn"
          >
            {status === 'submitting' ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /> 
                <span className="uppercase tracking-[0.3em] text-xs">Authorize Transmission</span>
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-4 text-red-500 justify-center p-6 bg-red-500/5 rounded-2xl border border-red-500/20 animate-fade-in">
              <AlertCircle size={24} className="shrink-0" />
              <div className="text-left leading-tight">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-red-400">Security / Link Fault</p>
                <p className="text-sm font-semibold text-red-300/90">{errorMessage}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
