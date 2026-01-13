import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, AlertCircle } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  url: string;
  invert?: boolean; // Invert colors for dark logos on black background
}

const partnersData: Partner[] = [
  { name: 'Sophos', logo: '/partners/sophos.svg', url: 'https://www.sophos.com', invert: true },
  { name: 'Fortinet', logo: '/partners/fortinet.svg', url: 'https://www.fortinet.com', invert: true },
  { name: 'AWS', logo: '/partners/aws.svg', url: 'https://aws.amazon.com', invert: true },
  { name: 'Azure', logo: '/partners/azure.svg', url: 'https://azure.microsoft.com' },
  { name: 'Google Cloud', logo: '/partners/google-cloud.svg', url: 'https://cloud.google.com' },
  { name: 'Bitdefender', logo: '/partners/bitdefender.svg', url: 'https://www.bitdefender.com' },
  { name: 'Microsoft', logo: '/partners/microsoft.svg', url: 'https://www.microsoft.com' },
  { name: 'Cloudflare', logo: '/partners/cloudflare.svg', url: 'https://www.cloudflare.com', invert: true },
  { name: 'Datadog', logo: '/partners/datadog.svg', url: 'https://www.datadoghq.com', invert: true },
  { name: 'HashiCorp', logo: '/partners/hashicorp.svg', url: 'https://www.hashicorp.com', invert: true },
  { name: 'Kaspersky', logo: '/partners/kaspersky.svg', url: 'https://www.kaspersky.com', invert: true },
];

const PartnerLogo: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-card p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 border-white/5 hover:border-brand-primary/40 transition-all duration-500 relative overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/[0.02] transition-colors duration-500" />
      
      <div className="relative z-10 w-full flex items-center justify-center h-12">
        {!hasError ? (
          <img
            src={partner.logo}
            alt={`${partner.name} - LINCO Verified Partner`}
            onError={() => {
              console.warn(`Partner logo missing: ${partner.logo}`);
              setHasError(true);
            }}
            className={`h-full w-auto max-w-[140px] object-contain transition-all duration-700 select-none
              ${partner.invert ? 'brightness-0 invert group-hover:invert-0 group-hover:brightness-100' : ''}
              grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 group-hover:scale-110
            `}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter bg-white/10 px-3 py-1 rounded-md">
              {partner.name}
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
        <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary/60">
          Integrated
        </span>
        <ExternalLink size={10} className="text-brand-primary/60" />
      </div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="py-32 container mx-auto px-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center mb-24 relative z-10">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
          <ShieldCheck size={14} className="animate-pulse" />
          Strategic Ecosystem
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.85]">
          Trusted by <br /><span className="text-brand-primary">Industry Leaders.</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
          We engineer our solutions on the world's most robust security and cloud 
          platforms, including <span className="text-white">Kaspersky</span> and <span className="text-white">AWS</span>.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 relative z-10">
        {partnersData.map((partner) => (
          <PartnerLogo key={partner.name} partner={partner} />
        ))}
      </div>

      {/* Trust Badge */}
      <div className="mt-24 flex flex-col items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-700">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.8em] translate-x-[0.4em]">
          End-to-End Compatibility Verified
        </div>
      </div>
    </section>
  );
};

export default Partners;
