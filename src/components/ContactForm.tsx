import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, Phone, Mail, User, Building2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    honeypot: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '', honeypot: '' });
      } else {
        throw new Error('API Error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-12 py-5 text-white focus:outline-none focus:border-brand-primary transition-all placeholder:text-slate-600";
  const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary/40 group-focus-within:text-brand-primary transition-colors";

  if (status === 'success') {
    return (
      <div className="glass-card p-16 rounded-[4rem] text-center max-w-4xl mx-auto border-brand-primary/30">
        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-brand-primary" />
        </div>
        <h3 className="text-4xl font-black text-white mb-4">Lead Captured.</h3>
        <p className="text-slate-400 mb-10 text-lg">Our engineering team has been notified. Expect a response within 4 business hours.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="btn-primary px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div id="contact-form" className="glass-card p-12 md:p-24 rounded-[4rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] pointer-events-none group-hover:bg-brand-primary/10 transition-all"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.85]">
            Scale your <br/><span className="text-brand-primary">operations.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto">
            Book a consultation with our system architects to build your next high-performance environment.
          </p>
        </div>

        <form className="max-w-3xl mx-auto space-y-6" onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
            className="hidden" 
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <User size={18} className={iconClass} />
              <input 
                required
                type="text" 
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={inputClass} 
              />
            </div>
            <div className="relative group">
              <Mail size={18} className={iconClass} />
              <input 
                required
                type="email" 
                placeholder="Work Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={inputClass} 
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative group">
              <Building2 size={18} className={iconClass} />
              <input 
                type="text" 
                placeholder="Company" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className={inputClass} 
              />
            </div>
            <div className="relative group">
              <Phone size={18} className={iconClass} />
              <input 
                type="tel" 
                placeholder="Phone (Optional)" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={inputClass} 
              />
            </div>
          </div>

          <div className="relative group">
            <textarea 
              required
              rows={5}
              placeholder="How can we help modernize your stack?" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-8 py-6 text-white focus:outline-none focus:border-brand-primary transition-all placeholder:text-slate-600 resize-none"
            ></textarea>
          </div>

          <button 
            disabled={status === 'loading'}
            className="w-full btn-primary py-6 rounded-full flex items-center justify-center gap-4 text-xl group disabled:opacity-50 active:scale-95 transition-transform"
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Initiate Project <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-3 justify-center text-red-500 text-sm font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/20">
              <AlertCircle size={16} /> Submission failed. Try direct email: info@linco.network
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;