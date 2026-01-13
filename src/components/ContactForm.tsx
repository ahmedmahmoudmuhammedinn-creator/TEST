
import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '', // SPAM protection
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
        setFormData({ name: '', email: '', company: '', message: '', honeypot: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-card p-12 rounded-[3rem] text-center animate-fade-in">
        <CheckCircle size={64} className="text-brand-primary mx-auto mb-6" />
        <h3 className="text-3xl font-black text-white mb-4">Message Received</h3>
        <p className="text-slate-400">Our team will reach out to you within 24 hours.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-brand-primary font-bold uppercase tracking-widest text-xs"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-12 md:p-24 rounded-[4rem] relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">Start your <br/><span className="text-brand-primary">transformation.</span></h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">Tell us about your infrastructure goals and we'll engineer the roadmap.</p>
        </div>

        <form className="max-w-2xl mx-auto space-y-6" onSubmit={handleSubmit}>
          {/* Honeypot hidden field */}
          <input 
            type="text" 
            name="honeypot" 
            value={formData.honeypot} 
            onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
            className="hidden" 
          />

          <div className="grid md:grid-cols-2 gap-6">
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-brand-primary transition-all" 
            />
            <input 
              required
              type="email" 
              placeholder="Work Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-brand-primary transition-all" 
            />
          </div>
          <input 
            type="text" 
            placeholder="Company Name (Optional)" 
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-brand-primary transition-all" 
          />
          <textarea 
            required
            rows={4}
            placeholder="Tell us about your project..." 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-brand-primary transition-all resize-none"
          ></textarea>

          <button 
            disabled={status === 'loading'}
            className="w-full btn-primary py-6 rounded-full flex items-center justify-center gap-3 text-lg group disabled:opacity-50"
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Send Inquiry <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-2 justify-center text-red-500 text-sm font-bold">
              <AlertCircle size={14} /> Submission failed. Please email info@linco.network directly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
