import React from 'react';

interface Partner {
  name: string;
  href: string;
}

const partners: Partner[] = [
  { name: 'Kaspersky', href: 'https://www.kaspersky.com' },
  { name: 'Sophos', href: 'https://www.sophos.com' },
  { name: 'Fortinet', href: 'https://www.fortinet.com' },
  { name: 'Bitdefender', href: 'https://www.bitdefender.com' },
  { name: 'AWS', href: 'https://aws.amazon.com' },
  { name: 'Microsoft', href: 'https://www.microsoft.com' },
  { name: 'Azure', href: 'https://azure.microsoft.com' },
  { name: 'Google Cloud', href: 'https://cloud.google.com' },
  { name: 'Cloudflare', href: 'https://www.cloudflare.com' },
  { name: 'Datadog', href: 'https://www.datadoghq.com' },
  { name: 'HashiCorp', href: 'https://www.hashicorp.com' },
  { name: 'GitHub', href: 'https://github.com' },
];

const PartnerCard: React.FC<{ partner: Partner }> = ({ partner }) => {
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-white/5 bg-[#050505] p-6 transition-all duration-500 hover:border-brand-primary/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.05)]"
    >
      {/* Premium Hover Glow */}
      <div className="absolute inset-0 z-0 bg-brand-primary/0 opacity-0 blur-[80px] transition-all duration-700 group-hover:bg-brand-primary/10 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        {/* Unified Pill Badge */}
        <div className="flex items-center gap-3 rounded-full bg-white/[0.03] border border-white/10 px-5 py-2.5 transition-all duration-500 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/30 group-hover:scale-105">
          {/* Green Dot Icon (Status Indicator) */}
          <div className="relative flex h-2 w-2">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75"></div>
            <div className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_10px_#10b981]"></div>
          </div>
          
          <span className="text-[11px] font-[900] uppercase tracking-[0.25em] text-white/90 group-hover:text-white">
            {partner.name}
          </span>
        </div>

        {/* Technical Descriptor Label */}
        <div className="opacity-30 transition-opacity duration-500 group-hover:opacity-80">
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-brand-primary">
            Infrastructure Partner
          </span>
        </div>
      </div>

      {/* Subtle corner accent for interactive feel */}
      <div className="absolute right-4 bottom-4 w-1 h-1 bg-brand-primary/0 rounded-full transition-all duration-500 group-hover:bg-brand-primary/40 group-hover:scale-[3]"></div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-32 bg-black" id="partners">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Content */}
        <div className="mb-24 text-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary animate-fade-in shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            Verified Network Nodes
          </div>
          
          <h2 className="mb-8 text-6xl font-black leading-[0.85] tracking-tighter text-white md:text-8xl">
            The Infrastructure <br />
            <span className="text-brand-primary italic">Backbone.</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
            Our systems interface directly with the world's most resilient cloud 
            and security architectures. Zero-latency integration is the default.
          </p>
        </div>

        {/* The Badge Matrix */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        {/* Status Verification Line */}
        <div className="mt-32 flex flex-col items-center justify-center gap-8 opacity-20">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent" />
          <span className="text-[10px] font-black uppercase tracking-[1.5em] text-slate-500 translate-x-[0.75em]">
            Operational Ecosystem Verified
          </span>
        </div>
      </div>
    </section>
  );
};

export default Partners;
