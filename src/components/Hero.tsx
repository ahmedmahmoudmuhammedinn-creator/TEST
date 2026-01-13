import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden flex flex-col items-center min-h-[90vh] justify-center">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 blur-[140px] rounded-full animate-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full animate-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 border border-brand-primary/20 rounded-full text-brand-primary text-[10px] font-extrabold uppercase tracking-[0.3em] mb-12 animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <Zap size={14} fill="currentColor" />
          The Infrastructure Standard
        </div>
        
        <h1 className="text-6xl md:text-9xl font-extrabold tracking-tight leading-[0.85] text-white mb-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Build for <br />
          <span className="text-emerald-gradient">the future.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          LINCO deploys intelligent, high-availability cloud systems for businesses that scale with zero compromise on security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a href="#contact" className="px-12 py-5 btn-primary rounded-full text-lg flex items-center gap-3">
            Get Started <ArrowRight size={20} />
          </a>
          <a href="#services" className="px-12 py-5 glass-card text-white rounded-full font-bold text-lg hover:border-brand-primary/50">
            View Platforms
          </a>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-50 text-xs font-bold uppercase tracking-[0.3em] animate-fade-in" style={{ animationDelay: '0.4s' }}>
           <div className="flex items-center gap-3 justify-center">
             <ShieldCheck size={18} className="text-brand-primary" />
             SOC2 Certified
           </div>
           <div className="flex items-center gap-3 justify-center">
             <Terminal size={18} className="text-brand-primary" />
             API First
           </div>
           <div className="hidden md:flex items-center gap-3 justify-center">
             <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
             Uptime 99.99%
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;