import React from 'react';
import { Instagram, Linkedin, Twitter, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 border-t border-brand-border bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-3 mb-10 group">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Terminal size={20} />
              </div>
              <span className="text-white font-black text-2xl tracking-tighter">LINCO</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Pioneering the next era of infrastructure. Intelligent systems built for the most ambitious engineering teams.
            </p>
          </div>

          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Platform</h4>
            <ul className="space-y-6 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Infrastructure Core</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Sentry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Global CDN</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Ecosystem</h4>
            <ul className="space-y-6 text-sm text-slate-500 font-medium">
              <li><a href="https://mail.linco.network" className="hover:text-white transition-colors">Client Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Specs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-10">Social</h4>
            <div className="flex gap-6">
              <a href="https://instagram.com/linco.eg" target="_blank" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-brand-border/30 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <div>&copy; {new Date().getFullYear()} LINCO Network Technologies.</div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Compliance</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;