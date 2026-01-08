import React from 'react';
import { ChevronRight, Shield, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pb-20 overflow-hidden bg-slate-950">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Now offering Free IT Audits
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
              Future-Proof IT for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 animate-gradient-x">
                Modern Business
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              We leverage AI-driven insights and cloud-native strategies to transform your infrastructure into a competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group">
                Get Started
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </a>
              <a href="#services" className="px-8 py-4 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-xl font-semibold transition-all duration-300">
                Explore Services
              </a>
            </div>
            
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                    <Shield size={16} className="text-blue-500" />
                    <span>Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500" />
                    <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={16} className="text-cyan-500" />
                    <span>Global Coverage</span>
                </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                    src="https://picsum.photos/800/600" 
                    alt="IT Dashboard" 
                    className="rounded-xl w-full h-auto opacity-90"
                />
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Zap size={24} className="text-green-500"/>
                     </div>
                     <div>
                        <div className="text-xs text-slate-400">System Status</div>
                        <div className="text-lg font-bold text-white">All Systems Operational</div>
                     </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;