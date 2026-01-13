
import React, { useState, useEffect } from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  url: string;
}

const PartnerGrid: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/partners.json')
      .then(res => res.json())
      .then(data => {
        setPartners(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching partner data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          <ShieldCheck size={14} />
          Global Integration Network
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          Our Strategic <br/><span className="text-brand-primary">Ecosystem.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We engineer our infrastructure on the world's most trusted platforms to ensure 
          enterprise-grade reliability for every deployment.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-10 rounded-3xl flex flex-col items-center justify-center gap-6 border-white/5 hover:border-brand-primary/30 transition-all duration-500 relative overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/[0.03] transition-colors" />
            
            <img
              src={partner.logo}
              alt={`${partner.name} logo`}
              className="h-10 w-auto object-contain logo-normalize grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-500"
            />
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">
                Visit Partner
              </span>
              <ExternalLink size={10} className="text-brand-primary" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PartnerGrid;
