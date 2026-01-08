import React, { useEffect, useRef } from 'react';
import { Cloud, ShieldCheck, Code, Server, LineChart, Headphones, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Cloud Migration',
    description: 'Seamlessly transition your infrastructure to AWS, Azure, or Google Cloud with zero downtime strategies.',
    details: [
      'Zero-downtime migration strategies',
      'Hybrid & Multi-cloud architecture',
      'Cost optimization & FinOps',
      'Kubernetes & Serverless setup'
    ],
    icon: <Cloud size={32} className="text-cyan-400" />
  },
  {
    id: '2',
    title: 'Cybersecurity',
    description: 'Enterprise-grade threat detection, penetration testing, and 24/7 security monitoring aimed at prevention.',
    details: [
      '24/7 SOC Monitoring',
      'Penetration Testing & Audits',
      'Compliance (GDPR, HIPAA, SOC2)',
      'Ransomware Protection'
    ],
    icon: <ShieldCheck size={32} className="text-blue-500" />
  },
  {
    id: '3',
    title: 'Custom Development',
    description: 'Bespoke software solutions built with modern stacks (React, Node, Python) tailored to your specific workflows.',
    details: [
      'Full-stack Web Applications',
      'Mobile App Development (iOS/Android)',
      'API Integration & Development',
      'Legacy System Modernization'
    ],
    icon: <Code size={32} className="text-purple-400" />
  },
  {
    id: '4',
    title: 'Managed IT',
    description: 'Proactive maintenance, helpdesk support, and infrastructure management to keep your business running.',
    details: [
      '24/7 Helpdesk Support',
      'Network Infrastructure Management',
      'Automated Backups & Disaster Recovery',
      'Hardware Procurement & Setup'
    ],
    icon: <Server size={32} className="text-emerald-400" />
  },
  {
    id: '5',
    title: 'Data Analytics',
    description: 'Turn raw data into actionable insights with our BI dashboards and machine learning models.',
    details: [
      'Business Intelligence Dashboards',
      'Predictive Analytics & ML',
      'Data Warehousing Solutions',
      'Real-time Reporting'
    ],
    icon: <LineChart size={32} className="text-orange-400" />
  },
  {
    id: '6',
    title: 'Consulting',
    description: 'Strategic technology planning to align your IT roadmap with your long-term business goals.',
    details: [
      'Digital Transformation Strategy',
      'IT Budgeting & Planning',
      'Vendor Management',
      'Technology Feasibility Studies'
    ],
    icon: <Headphones size={32} className="text-pink-400" />
  }
];

interface ServicesProps {
  onAskAI: (serviceTitle: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onAskAI }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const windowHeight = window.innerHeight;

      services.forEach((_, index) => {
        const wrapper = iconRefs.current[index];
        if (!wrapper || !wrapper.parentElement) return;

        // Calculate position based on the parent card to avoid feedback loops 
        // (since the wrapper itself is being transformed)
        const parentRect = wrapper.parentElement.getBoundingClientRect();
        const elementY = parentRect.top + 60; // Approximate vertical center of the icon
        
        // Distance from center of viewport
        const dist = elementY - windowHeight / 2;
        
        // Parallax Factor: 0.1 means the icon moves 10% faster than the scroll,
        // creating a "foreground" depth effect where it feels closer to the user.
        wrapper.style.transform = `translateY(${dist * 0.1}px)`;
      });
    };

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    handleScroll(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-cyan-900/20 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Comprehensive IT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Solutions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We deliver end-to-end technology services designed to empower your business to scale securely and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20 flex flex-col h-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Main Content - Blurs on Hover */}
              <div className="relative z-10 flex flex-col h-full transition-all duration-300 group-hover:blur-sm group-hover:opacity-40">
                {/* Parallax Wrapper: Controlled by JS */}
                <div 
                  ref={el => iconRefs.current[index] = el}
                  className="mb-6 inline-block relative z-20 will-change-transform"
                >
                    {/* Animation Wrapper: CSS Float Animation */}
                    <div className="animate-float" style={{ animationDelay: `${index * 0.5}s` }}>
                        {/* Styling Wrapper: Visuals & Hover Effects */}
                        <div className="p-4 bg-slate-800 rounded-xl w-fit transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-black/20">
                          {service.icon}
                        </div>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <div className="inline-flex items-center text-sm font-semibold text-blue-500 mt-auto">
                  Learn more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Floating Tooltip/Popover */}
              <div className="absolute inset-4 z-20 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-xl shadow-2xl flex flex-col justify-between p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-8 group-hover:translate-y-0">
                  <div className="overflow-y-auto">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
                      {service.title}
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded uppercase tracking-wider border border-cyan-900/50">Details</span>
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-400" />
                          <span className="leading-tight">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2 mt-auto">
                    <button 
                      onClick={() => onAskAI(service.title)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 border border-slate-700 hover:border-slate-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Sparkles size={14} />
                      Ask AI for Details
                    </button>
                    <a href="#contact" className="block w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-center rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40">
                      Get Quote
                    </a>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;