import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, Cpu } from 'lucide-react';

interface Partner {
  name: string;
  slug: string; // Simple Icons slug
  href: string;
  customUrl?: string; // Fallback for logos not on Simple Icons if needed
}

const partners: Partner[] = [
  { name: 'Kaspersky', slug: 'kaspersky', href: 'https://www.kaspersky.com' },
  { name: 'Sophos', slug: 'sophos', href: 'https://www.sophos.com' },
  { name: 'Fortinet', slug: 'fortinet', href: 'https://www.fortinet.com' },
  { name: 'Bitdefender', slug: 'bitdefender', href: 'https://www.bitdefender.com' },
  { name: 'AWS', slug: 'amazonwebservices', href: 'https://aws.amazon.com' },
  { name: 'Microsoft', slug: 'microsoft', href: 'https://www.microsoft.com' },
  { name: 'Azure', slug: 'microsoftazure', href: 'https://azure.microsoft.com' },
  { name: 'Google Cloud', slug: 'googlecloud', href: 'https://cloud.google.com' },
  { name: 'Cloudflare', slug: 'cloudflare', href: 'https://www.cloudflare.com' },
  { name: 'Datadog', slug: 'datadog', href: 'https://www.datadoghq.com' },
  { name: 'HashiCorp', slug: 'hashicorp', href: 'https://www.hashicorp.com' },
  { name: 'GitHub', slug: 'github', href: 'https://github.com' },
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  const [hasError, setHasError] = useState(false);
  // Using Simple Icons CDN with ffffff (white) for the dark theme
  const logoUrl = partner.customUrl || `https://cdn.simpleicons.org/${partner.slug}/ffffff`;

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-32 flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/5 bg-black/40 p-8 transition-all duration-500 hover:border-brand-primary/40 hover:bg-brand-primary/[0.02]"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 z-0 bg-brand-primary/0 opacity-0 blur-3xl transition-all duration-500 group-hover:bg-brand-primary/10 group-hover:opacity-100" />

      <div className="relative z-10 flex w-full items-center justify-center">
        {!hasError ? (
          <img
            src={logoUrl}
            alt={`${partner.name} logo`}
            loading="lazy"
            onError={() => {
              console.warn(`[LINCO] Partner logo failed to load: ${partner.name} at ${logoUrl}`);
              setHasError(true);
            }}
            style={{ height: '28px' }}
            className="w-auto object-contain transition-all duration-700 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
          />
        ) : (
          /* Premium Styled Fallback Badge */
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 transition-all group-hover:border-brand-primary/40 group-hover:bg-brand-primary/10">
              <Cpu size={14} className="text-brand-primary/60 group-hover:text-brand-primary animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90 group-hover:text-white">
                {partner.name}
              </span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-brand-primary/40 group-hover:text-brand-primary/70 transition-colors">
              Infrastructure Partner
            </span>
          </div>
        )}
      </div>

      {/* Detail Indicator */}
      <div className="absolute right-6 top-6 translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
        <ExternalLink size={12} className="text-brand-primary/50" />
      </div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-32" id="partners">
      {/* Decorative Atmosphere */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.03] blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-24 text-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <ShieldCheck size={16} className="animate-pulse" />
            Strategic Security Ecosystem
          </div>
          <h2 className="mb-8 text-6xl font-black leading-[0.85] tracking-tighter text-white md:text-8xl">
            Trusted by Industry <br />
            <span className="text-brand-primary italic">Leaders & Pioneers.</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl font-medium text-slate-500 leading-relaxed">
            We architect our delivery pipelines using the world's most resilient 
            cloud and security providers, ensuring <span className="text-white">SOC2 compliant</span>, zero-compromise deployments for every client.
          </p>
        </div>

        {/* Integrated Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        {/* Confidence Footer */}
        <div className="mt-32 flex flex-col items-center justify-center gap-8 opacity-20 transition-all duration-1000 hover:opacity-100 group">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent transition-all duration-1000 group-hover:w-96" />
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[1.2em] text-slate-500 translate-x-[0.6em]">
              Operational Excellence Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
