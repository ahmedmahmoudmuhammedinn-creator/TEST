import React from 'react';
import { Cloud, ShieldCheck, Code, Server, LineChart, Terminal, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Cloud Core',
    description: 'High-availability infrastructure engineered for speed and global scale.',
    details: ['Global CDN', 'Load Balancing'],
    icon: <Cloud size={24} />
  },
  {
    id: '2',
    title: 'Safe Vault',
    description: 'Defensive security protocols and 24/7 threat monitoring for teams.',
    details: ['Zero Trust', 'Threat Detection'],
    icon: <ShieldCheck size={24} />
  },
  {
    id: '3',
    title: 'Deploy Engine',
    description: 'CI/CD pipelines that transform code into production-ready assets.',
    details: ['Auto-scaling', 'Monitoring'],
    icon: <Code size={24} />
  },
  {
    id: '4',
    title: 'Managed Edge',
    description: 'Fleet management for distributed networks and on-premise nodes.',
    details: ['Node Health', 'Compliance'],
    icon: <Server size={24} />
  },
  {
    id: '5',
    title: 'Insight BI',
    description: 'Data warehousing and telemetry visualizers for strategic growth.',
    details: ['ML Ready', 'Real-time Feed'],
    icon: <LineChart size={24} />
  },
  {
    id: '6',
    title: 'Architect',
    description: 'Deep-dive consulting for legacy migrations and modern stacks.',
    details: ['Tech Audits', 'Cloud Strategy'],
    icon: <Terminal size={24} />
  }
];

interface ServicesProps {
  onAskAI: (serviceTitle: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onAskAI }) => {
  return (
    <div className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9]">
            Engineered for <br /><span className="text-brand-primary">performance.</span>
          </h2>
          <p className="text-xl text-slate-400">
            A comprehensive suite of IT tools designed to give your engineering team an unfair advantage.
          </p>
        </div>
        <a href="#contact" className="text-brand-primary font-bold flex items-center gap-2 hover:gap-4 transition-all mb-2 uppercase tracking-widest text-xs border-b border-brand-primary/20 pb-2">
          View Documentation <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="group glass-card p-10 rounded-[2rem] flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center justify-center text-brand-primary mb-10 transition-transform group-hover:scale-110 group-hover:rotate-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                {service.description}
              </p>
            </div>
            <button 
              onClick={() => onAskAI(service.title)}
              className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.3em] text-brand-primary border border-brand-primary/20 px-6 py-3 rounded-full hover:bg-brand-primary hover:text-black transition-all"
            >
              Ask AI Agent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;