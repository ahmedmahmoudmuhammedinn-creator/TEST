import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  logo: string; // Path relative to /public
  url: string;
  invert?: boolean; // If true, applies brightness/invert for dark logos
}

const partners: Partner[] = [
  { name: 'Sophos', logo: 'https://cdn.worldvectorlogo.com/logos/sophos.svg', url: 'https://www.sophos.com', invert: true },
  { name: 'Fortinet', logo: 'https://cdn.worldvectorlogo.com/logos/fortinet.svg', url: 'https://www.fortinet.com', invert: true },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg', url: 'https://aws.amazon.com', invert: true },
  { name: 'Azure', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg', url: 'https://azure.microsoft.com' },
  { name: 'Google Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg', url: 'https://cloud.google.com' },
  { name: 'Bitdefender', logo: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg', url: 'https://www.bitdefender.com' },
  { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg', url: 'https://www.microsoft.com' },
  { name: 'Cloudflare', logo: 'https://cdn.worldvectorlogo.com/logos/cloudflare.svg', url: 'https://www.cloudflare.com', invert: true },
  { name: 'Datadog', logo: 'https://cdn.worldvectorlogo.com/logos/datadog.svg', url: 'https://www.datadoghq.com', invert: true },
  { name: 'HashiCorp', logo: 'https://cdn.worldvectorlogo.com/logos/hashicorp.svg', url: 'https://www.hashicorp.com', invert: true },
];

const Partners: React.FC = () => {
  return (
    <section className="py-32 container mx-auto px-6 relative overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
          <ShieldCheck size={14} className="animate-pulse" />
          The Infrastructure Ecosystem
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          Trusted by <br /><span className="text-brand-primary">Industry Pioneers.</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          We integrate with world-class security and cloud platforms to deliver 
          uncompromising resilience for your critical operations.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group glass-card p-12 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 border-white/5 hover:border-brand-primary/40 transition-all duration-500 relative overflow-hidden"
          >
            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/[0.02] transition-colors duration-500" />
            
            <div className="relative z-10 w-full flex items-center justify-center h-12">
              <img
                src={partner.logo}
                alt={`${partner.name} - LINCO Verified Partner`}
                className={`h-full w-auto object-contain transition-all duration-700 select-none
                  ${partner.invert ? 'brightness-0 invert group-hover:invert-0 group-hover:brightness-100' : ''}
                  grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 group-hover:scale-110
                `}
                loading="lazy"
              />
            </div>
            
            <div className="absolute bottom-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary/60">
                Verified Integrator
              </span>
              <ExternalLink size={10} className="text-brand-primary/60" />
            </div>
          </a>
        ))}
      </div>

      {/* Bottom Label */}
      <div className="mt-20 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[1em] translate-x-[0.5em]">
          End-to-End Compatibility
        </div>
      </div>
    </section>
  );
};

export default Partners;
