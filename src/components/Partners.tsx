import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Cpu } from 'lucide-react';

interface Partner {
  name: string;
  src: string;
  href: string;
  invertOnDark?: boolean;
}

// Strategic selection of high-stability CDN URLs
const partners: Partner[] = [
  { 
    name: 'Kaspersky', 
    src: 'https://cdn.simpleicons.org/kaspersky/white', 
    href: 'https://www.kaspersky.com' 
  },
  { 
    name: 'Sophos', 
    src: 'https://www.vectorlogo.zone/logos/sophos/sophos-ar21.svg', 
    href: 'https://www.sophos.com',
    invertOnDark: true
  },
  { 
    name: 'Fortinet', 
    src: 'https://www.vectorlogo.zone/logos/fortinet/fortinet-ar21.svg', 
    href: 'https://www.fortinet.com',
    invertOnDark: true 
  },
  { 
    name: 'Bitdefender', 
    src: 'https://cdn.simpleicons.org/bitdefender/white', 
    href: 'https://www.bitdefender.com' 
  },
  { 
    name: 'AWS', 
    src: 'https://cdn.simpleicons.org/amazonwebservices/white', 
    href: 'https://aws.amazon.com' 
  },
  { 
    name: 'Microsoft', 
    src: 'https://cdn.simpleicons.org/microsoft/white', 
    href: 'https://www.microsoft.com' 
  },
  { 
    name: 'Azure', 
    src: 'https://cdn.simpleicons.org/microsoftazure/white', 
    href: 'https://azure.microsoft.com' 
  },
  { 
    name: 'Google Cloud', 
    src: 'https://cdn.simpleicons.org/googlecloud/white', 
    href: 'https://cloud.google.com' 
  },
  { 
    name: 'Cloudflare', 
    src: 'https://cdn.simpleicons.org/cloudflare/white', 
    href: 'https://www.cloudflare.com' 
  },
  { 
    name: 'Datadog', 
    src: 'https://cdn.simpleicons.org/datadog/white', 
    href: 'https://www.datadoghq.com' 
  },
  { 
    name: 'HashiCorp', 
    src: 'https://cdn.simpleicons.org/hashicorp/white', 
    href: 'https://www.hashicorp.com' 
  },
  { 
    name: 'GitHub', 
    src: 'https://cdn.simpleicons.org/github/white', 
    href: 'https://github.com' 
  }
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [error, setError] = useState(false);

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/40 p-8 transition-all duration-500 hover:border-brand-primary/40 hover:bg-brand-primary/[0.02]"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 z-0 bg-brand-primary/0 opacity-0 blur-2xl transition-all duration-500 group-hover:bg-brand-primary/10 group-hover:opacity-100" />

      <div className="relative z-10 flex w-full items-center justify-center">
        {!error ? (
          <img
            src={partner.src}
            alt={`${partner.name} logo`}
            loading="lazy"
            onError={() => {
              console.warn(`[LINCO] Partner logo failed to load: ${partner.name} at ${partner.src}`);
              setError(true);
            }}
            className={`h-7 w-auto object-contain transition-all duration-700
              ${partner.invertOnDark ? 'brightness-0 invert group-hover:invert-0 group-hover:brightness-100' : ''}
              grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110
            `}
          />
        ) : (
          /* Premium Fallback Badge */
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2 transition-all group-hover:border-brand-primary/30 group-hover:bg-brand-primary/5">
              <Cpu size={12} className="text-brand-primary/60 group-hover:text-brand-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80 group-hover:text-white">
                {partner.name}
              </span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-tighter text-brand-primary/30 group-hover:text-brand-primary/60">
              Verified Node
            </span>
          </div>
        )}
      </div>

      {/* External Indicator */}
      <div className="absolute right-4 top-4 translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
        <ExternalLink size={10} className="text-brand-primary/40" />
      </div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-32" id="partners">
      {/* Structural Decoration */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary animate-fade-in">
            <ShieldCheck size={14} className="animate-pulse" />
            Infrastructure Backbone
          </div>
          <h2 className="mb-6 text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl lg:text-8xl">
            Trusted by Industry <br />
            <span className="text-brand-primary italic">Leaders & Pioneers.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500">
            We architect our delivery pipelines using the world's most resilient 
            cloud and security providers, ensuring <span className="text-white">zero-compromise</span> deployments.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        {/* Global Verification Footer */}
        <div className="mt-24 flex flex-col items-center justify-center gap-6 opacity-30 transition-all duration-700 hover:opacity-100">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
          <p className="text-[9px] font-black uppercase tracking-[1em] text-slate-500 translate-x-[0.5em]">
            Multi-Region Compliance Verified
          </p>
        </div>
      </div>
    </section>
  );
};

export default Partners;
