import React, { useState } from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  url: string;
  invertOnDark?: boolean; // Forces logo to white/light for dark backgrounds
}

const partners: Partner[] = [
  { name: 'Kaspersky', logo: '/partners/kaspersky.svg', url: 'https://www.kaspersky.com', invertOnDark: true },
  { name: 'Sophos', logo: '/partners/sophos.svg', url: 'https://www.sophos.com', invertOnDark: true },
  { name: 'Fortinet', logo: '/partners/fortinet.svg', url: 'https://www.fortinet.com', invertOnDark: true },
  { name: 'Bitdefender', logo: '/partners/bitdefender.svg', url: 'https://www.bitdefender.com' },
  { name: 'AWS', logo: '/partners/aws.svg', url: 'https://aws.amazon.com', invertOnDark: true },
  { name: 'Microsoft', logo: '/partners/microsoft.svg', url: 'https://www.microsoft.com' },
  { name: 'Azure', logo: '/partners/azure.svg', url: 'https://azure.microsoft.com' },
  { name: 'Google Cloud', logo: '/partners/google-cloud.svg', url: 'https://cloud.google.com' },
  { name: 'Cloudflare', logo: '/partners/cloudflare.svg', url: 'https://www.cloudflare.com', invertOnDark: true },
  { name: 'Datadog', logo: '/partners/datadog.svg', url: 'https://www.datadoghq.com', invertOnDark: true },
  { name: 'HashiCorp', logo: '/partners/hashicorp.svg', url: 'https://www.hashicorp.com', invertOnDark: true },
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass-card p-8 rounded-[2rem] flex flex-col items-center justify-center min-h-[140px] border-white/5 hover:border-brand-primary/40 transition-all duration-500 relative overflow-hidden"
    >
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/[0.02] transition-colors duration-500" />
      
      <div className="relative z-10 w-full flex items-center justify-center">
        {!imgError ? (
          <img
            src={partner.logo}
            alt={partner.name}
            onError={() => {
              console.warn(`[LINCO] Missing logo for ${partner.name} at path: ${partner.logo}`);
              setImgError(true);
            }}
            className={`h-8 md:h-10 w-auto object-contain transition-all duration-700 select-none
              ${partner.invertOnDark ? 'brightness-0 invert group-hover:invert-0 group-hover:brightness-100' : ''}
              grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 group-hover:scale-110
            `}
            loading="lazy"
          />
        ) : (
          /* High-quality Text Badge Fallback */
          <div className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-black text-white uppercase tracking-widest px-4 py-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-brand-primary/30 transition-colors">
              {partner.name}
            </span>
            <span className="text-[8px] font-bold text-brand-primary/40 uppercase tracking-tighter">
              Verified Partner
            </span>
          </div>
        )}
      </div>

      {/* Hover Icon */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 duration-500">
        <ExternalLink size={12} className="text-brand-primary/40" />
      </div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="py-32 container mx-auto px-6 relative overflow-hidden" id="partners">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-primary/5 blur-[160px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-primary/5 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
          <ShieldCheck size={14} className="animate-pulse" />
          The Infrastructure Standard
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          Trusted by Industry <br /><span className="text-brand-primary italic">Leaders & Pioneers.</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          We integrate with world-class security and cloud platforms to deliver 
          uncompromising resilience for your critical operations.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 relative z-10">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>

      {/* Compatibility Badge */}
      <div className="mt-20 flex flex-col items-center gap-6 opacity-30 hover:opacity-100 transition-all duration-700">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
        <p className="text-[9px] font-black text-slate-500 uppercase tracking-[1em] translate-x-[0.5em]">
          End-to-End Compatibility Verified
        </p>
      </div>
    </section>
  );
};

export default Partners;
