import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, User, Mail, Building, Phone } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    honeypot: '' // Spam protection
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent fail for bots

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();
      setStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '', message: '', honeypot: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  const inputStyles = "w-full bg-brand-black/50 border border-brand-primary/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:bg-brand-primary/5";

  if (status === 'success') {
    return (
      <div className="glass-card p-12 rounded-[2rem] text-center border-brand-primary/40 animate-fade-in">
        <CheckCircle className="w-16 h-16 text-brand-primary mx-auto mb-6" />
        <h3 className="text-3xl font-black text-white mb-4">Inquiry Received</h3>
        <p className="text-slate-400 mb-8">One of our engineers will reach out to you within 24 hours.</p>
        <button onClick={() => setStatus('idle')} className="text-brand-primary font-bold uppercase tracking-widest text-xs border-b border-brand-primary pb-1">Send another message</button>
      </div>
    );
  }

  return (
    <div className="glass-card p-10 md:p-20 rounded-[3rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[100px] pointer-events-none group-hover:bg-brand-primary/10 transition-all"></div>
      
      <div className="relative z-10">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Let's build <br/><span className="text-brand-primary">together.</span>
          </h2>
          <p className="text-slate-400 text-lg">Engineering consultation for your next infrastructure milestone.</p>
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
              <input type="text" placeholder="Company (Optional)" className={inputStyles} value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/40" />
              <input type="tel" placeholder="Phone Number" className={inputStyles} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>

          <textarea required placeholder="Project Details" rows={5} className="w-full bg-brand-black/50 border border-brand-primary/10 rounded-xl p-6 text-white focus:border-brand-primary outline-none transition-all placeholder:text-slate-600 focus:bg-brand-primary/5 resize-none" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>

          <button disabled={status === 'submitting'} className="w-full bg-brand-primary text-black font-black py-6 rounded-2xl flex items-center justify-center gap-3 hover:bg-brand-hover transition-all active:scale-95 disabled:opacity-50">
            {status === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Initiate Consultation</>}
          </button>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 justify-center text-sm font-bold bg-red-500/10 py-4 rounded-xl">
              <AlertCircle size={16} /> Connection error. Please try again or email info@linco.network.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;