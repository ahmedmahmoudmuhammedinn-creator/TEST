
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Error ${response.status}: Failed to send.`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('Form Submit Error:', err);
      setErrorMessage(err.message || 'Check your internet connection or try again later.');
      setStatus('error');
    }
  };

  const inputStyles = "w-full bg-black border border-brand-primary/20 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50";

  if (status === 'success') {
    return (
      <div className="glass-card p-12 rounded-[2rem] text-center border-brand-primary/40 animate-fade-in shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-brand-primary" />
        </div>
        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Transmission Received</h3>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto">One of our systems engineers will review your request and contact you shortly.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-primary font-bold uppercase tracking-widest text-[10px] hover:text-brand-hover transition-colors border-b border-brand-primary/30 pb-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-10 md:p-20 rounded-[3rem] relative overflow-hidden group border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 blur-[120px] pointer-events-none group-hover:bg-brand-primary/10 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            Contact Engineering
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
            Scale your <br/><span className="text-brand-primary">infrastructure.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg">Technical consultation for high-availability systems and modern cloud architecture.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" className="hidden" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input required type="text" placeholder="Full Name" className={inputStyles} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input required type="email" placeholder="Email Address" className={inputStyles} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input type="text" placeholder="Company" className={inputStyles} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input type="tel" placeholder="Phone (Optional)" className={inputStyles} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div className="relative">
            <textarea 
              required 
              placeholder="Tell us about your project or technical challenge..." 
              rows={5} 
              className="w-full bg-black border border-brand-primary/20 rounded-xl p-6 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50 resize-none" 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={status === 'submitting'} 
            className="w-full bg-brand-primary text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-hover transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
          >
            {status === 'submitting' ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                <Send size={20} className="mt-0.5" /> 
                <span className="uppercase tracking-widest text-xs">Initiate Project Consultation</span>
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-3 text-red-500 justify-center p-5 bg-red-500/5 rounded-2xl border border-red-500/20 animate-fade-in">
              <AlertCircle size={20} className="shrink-0" />
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-widest mb-1">Transmission Error</p>
                <p className="text-sm font-medium text-red-400/80 leading-tight">{errorMessage}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
