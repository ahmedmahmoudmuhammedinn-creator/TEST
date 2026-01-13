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
    
    // Check honeypot immediately
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

      // Parse JSON even for errors to get the custom message
      const result = await response.json();

      if (!response.ok) {
        // This will now capture "Provider Error: ..." or "Server configuration error: ..."
        throw new Error(result.message || `Server responded with ${response.status}`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', honeypot: '' });
    } catch (err: any) {
      console.error('Contact Form Debug:', err);
      setErrorMessage(err.message || 'Failed to connect to the server. Please check your internet or try again later.');
      setStatus('error');
    }
  };

  const inputStyles = "w-full bg-black/60 border border-brand-primary/20 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50";

  if (status === 'success') {
    return (
      <div className="glass-card p-12 rounded-[2.5rem] text-center border-brand-primary/40 animate-fade-in shadow-[0_0_60px_rgba(16,185,129,0.1)]">
        <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-brand-primary" />
        </div>
        <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Transmission Success</h3>
        <p className="text-slate-400 mb-10 max-w-sm mx-auto leading-relaxed">
          Your inquiry has been routed to our systems architecture team. Expect a response within one business day.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px] hover:text-brand-hover transition-all"
        >
          Send another transmission
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-10 md:p-20 rounded-[3rem] relative overflow-hidden group border-white/5">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      <div className="relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-widest mb-8">
            Network Operations Center
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.8]">
            Let's build <br/><span className="text-brand-primary">excellence.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md mt-10">High-performance infrastructure begins with a single technical conversation.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input required type="text" placeholder="Identity / Full Name" className={inputStyles} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input required type="email" placeholder="Professional Email" className={inputStyles} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input type="text" placeholder="Organization" className={inputStyles} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input type="tel" placeholder="Contact Frequency (Phone)" className={inputStyles} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <div className="relative">
            <textarea 
              required 
              placeholder="Technical requirements or project scope..." 
              rows={5} 
              className="w-full bg-black/60 border border-brand-primary/20 rounded-xl p-6 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-brand-primary/50 resize-none" 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})}
            ></textarea>
          </div>

          <button 
            disabled={status === 'submitting'} 
            className="w-full bg-brand-primary text-black font-black py-7 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-hover transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(16,185,129,0.25)] group"
          >
            {status === 'submitting' ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
                <span className="uppercase tracking-[0.3em] text-xs">Launch Consultation</span>
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-4 text-red-500 justify-center p-6 bg-red-500/5 rounded-2xl border border-red-500/10 animate-fade-in">
              <AlertCircle size={24} className="shrink-0" />
              <div className="text-left leading-tight">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-red-400">System Fault Detected</p>
                <p className="text-sm font-medium text-red-300/80">{errorMessage}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;