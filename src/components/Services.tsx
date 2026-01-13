import React from 'react';
import { ShieldCheck, Code, Server, ArrowRight, CheckCircle2, Terminal, Users, Cpu, Globe } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  onAskAI: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, icon, onAskAI }) => (
  <div className="group glass-card p-10 rounded-[2.5rem] flex flex-col h-full border-white/5 hover:border-brand-primary/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.1)]">
    <div className="mb-10">
      <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-black text-white mb-4 tracking-tighter italic">{title}</h3>
      <p className="text-slate-400 leading-relaxed mb-8 text-sm">
        {description}
      </p>
      <ul className="space-y-3 mb-10">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
    <div className="mt-auto pt-6 flex flex-col gap-4">
      <button 
        onClick={onAskAI}
        className="w-full py-4 rounded-xl bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-primary hover:text-black transition-all"
      >
        Ask AI Consultant
      </button>
      <a href="#contact" className="text-center py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
        Get Started
      </a>
    </div>
  </div>
);

interface ServicesProps {
  onAskAI: (serviceTitle: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onAskAI }) => {
  const servicePillars = [
    {
      title: 'IT Outsourcing',
      description: 'Comprehensive help desk and hardware lifecycle management for modern teams.',
      icon: <Users size={28} />,
      features: [
        'Instant Help Desk support',
        'Device maintenance & health',
        'Advanced hardware deployment',
        'Fast remote assistance',
        'Backup & security hardening',
        'Official Licensing (MS, Adobe)'
      ]
    },
    {
      title: 'Software Dev',
      description: 'Custom systems engineered around real business needs, built for long-term growth.',
      icon: <Code size={28} />,
      features: [
        'Bespoke CRM & ERP solutions',
        'Scalable cloud-native apps',
        'Flexible API integrations',
        'UX/UI focused engineering',
        'Performance optimization',
        'Maintenance & lifecycle'
      ]
    },
    {
      title: 'Infrastructure',
      description: 'Reliable network foundations designed to handle heavy enterprise workloads.',
      icon: <Cpu size={28} />,
      features: [
        'Enterprise Firewalls & Switches',
        'High-speed Server nodes',
        'Global network engineering',
        'Robust threat prevention',
        'Uptime-critical performance',
        'Hybrid cloud architectures'
      ]
    }
  ];

  const partners = ['Microsoft', 'Kaspersky', 'Adobe', 'Fortinet'];

  return (
    <div className="py-40 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10">
            <Globe size={14} />
            Enterprise Service Standards
          </div>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8">
            Scale with <br /><span className="text-emerald-gradient italic">Intelligence.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            LINCO delivers a unified ecosystem where every network and software system works together to provide a next-level experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {servicePillars.map((pillar, idx) => (
            <ServiceCard 
              key={idx} 
              {...pillar} 
              onAskAI={() => onAskAI(pillar.title)}
            />
          ))}
        </div>

        {/* Partners Line */}
        <div className="flex flex-col items-center justify-center gap-10 mb-40 border-y border-white/5 py-12">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Official Certified Partner</span>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {partners.map(p => (
              <span key={p} className="text-white text-xl font-black tracking-tighter opacity-80 hover:text-brand-primary hover:opacity-100 cursor-default transition-all">{p}</span>
            ))}
          </div>
        </div>

        {/* Social Proof Block */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative">
             <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full"></div>
             <div className="glass-card p-12 rounded-[3rem] border-brand-primary/20 relative z-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-black">e&</div>
                   <div>
                      <p className="text-white font-bold text-lg">e& UAE</p>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Enterprise Selection</p>
                   </div>
                </div>
                <h4 className="text-3xl font-black text-white mb-6 tracking-tight leading-tight italic">"Thousands of requests. Millions of actions. One system."</h4>
                <p className="text-slate-400 leading-relaxed mb-0 text-sm italic">
                  Without a strong system, growth is impossible. That’s why e& UAE chose LINCO. Our Smart CRM & Ticketing System ensures their operations never stop.
                </p>
             </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-5xl font-black text-white tracking-tighter leading-[0.9]">
              Unified Systems. <br /><span className="text-brand-primary">Next-Level Experience.</span>
            </h3>
            <p className="text-lg text-slate-400 leading-relaxed">
              Every system and every network is designed to work together. We solve the complexity of modern IT so you can focus on your mission.
            </p>
            <div className="flex items-center gap-4 py-4">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
               <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 italic">LINCO — Smart solutions that take you higher.</span>
            </div>
          </div>
        </div>

        {/* Final CTA Block */}
        <div className="glass-card p-16 md:p-24 rounded-[4rem] text-center border-brand-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent"></div>
          <div className="relative z-10">
            <Terminal size={48} className="text-brand-primary mx-auto mb-10 opacity-50" />
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic leading-none">
              Need a professional <br/><span className="text-brand-primary">IT Team?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              We solve hardware, network, and cybersecurity issues so your business keeps moving. Secure. Smart. Scalable.
            </p>
            <div className="flex justify-center">
              <a 
                href="#contact" 
                className="bg-brand-primary text-black px-16 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-hover transition-all flex items-center gap-4 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
              >
                Start Transmission <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;