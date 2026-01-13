import React from 'react';
import { Instagram, Linkedin, Twitter, Terminal, MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-32 border-t border-brand-border bg-brand-black">
      <div className="container mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-8">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                <Terminal size={20} />
              </div>
              <span className="text-white font-black text-2xl tracking-tighter">LINCO</span>
            </a>
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg tracking-tight">linco | <span className="text-brand-primary">Secure. Smart. Scalable.</span></h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                We build secure software, network, and cybersecurity solutions tailored to your business goals. Engineering the future of digital safety.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com/linco.eg" target="_blank" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 glass-card rounded-xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary/50 transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-10">Solutions</h4>
            <ul className="space-y-5">
              {['Cybersecurity Defense', 'Cloud Infrastructure', 'Network Engineering', 'Software Development'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-brand-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Headquarters & Communication */}
          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-10">Headquarters</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border-brand-primary/10">
                  <MapPin size={16} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Cairo Office</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Maadi 9 street,<br />Cairo, Egypt</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border-brand-primary/10">
                  <Phone size={16} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Direct Line</p>
                  <a href="tel:+201140073905" className="text-slate-500 text-xs hover:text-brand-primary transition-colors">
                    +20 11 40073905
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Digital Hub */}
          <div>
            <h4 className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.4em] mb-10">Digital Hub</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border-brand-primary/10">
                  <Mail size={16} className="text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-white text-sm font-semibold mb-1">Correspondence</p>
                  <a href="mailto:info@linco.network" className="block text-slate-500 text-xs hover:text-brand-primary transition-colors">
                    info@linco.network
                  </a>
                  <a href="mailto:ahmed.muhammedin@linco.network" className="block text-slate-500 text-xs hover:text-brand-primary transition-colors">
                    ahmed.muhammedin@linco.network
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 glass-card rounded-xl flex items-center justify-center shrink-0 border-brand-primary/10">
                  <Globe size={16} className="text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-white text-sm font-semibold mb-1">Network</p>
                  <a href="https://linco.network" target="_blank" className="flex items-center gap-2 text-slate-500 text-xs hover:text-brand-primary transition-colors">
                    linco.network <ArrowUpRight size={10} />
                  </a>
                  <a href="https://linco.eg" target="_blank" className="flex items-center gap-2 text-slate-500 text-xs hover:text-brand-primary transition-colors">
                    linco.eg <ArrowUpRight size={10} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-brand-border/30 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            &copy; {new Date().getFullYear()} LINCO Network Technologies.
          </div>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">System Status</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;