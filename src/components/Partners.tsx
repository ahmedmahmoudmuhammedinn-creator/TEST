import React from 'react';
import { ShieldCheck, ExternalLink, Cpu, Activity } from 'lucide-react';

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
      {/* Kinetic Background Glow */}
      <div className="absolute inset-0 z-0 bg-brand-primary/0 opacity-0 blur-3xl transition-all duration-700 group-hover:bg-brand-primary/10 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-center gap-3">
        {/* Pill Badge */}
        <div className="flex items-center gap-3 rounded-full bg-white/[0.03] border border-white/10 px-5 py-2 transition-all duration-500 group-hover:bg-brand-primary/5 group-hover:border-brand-primary/30 group-hover:scale-105">
          {/* Status Dot */}
          <div className="relative flex h-2 w-2">
            <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75"></div>
            <div className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary shadow-[0_0_10px_#10b981]"></div>
          </div>
          
          <span className="text-[11px] font-[900] uppercase tracking-[0.25em] text-white/90 group-hover:text-white">
            {partner.name}
          </span>
        </div>

        {/* Secondary Label */}
        <div className="flex items-center gap-2 opacity-40 transition-opacity duration-500 group-hover:opacity-100">
          <Activity size={10} className="text-brand-primary" />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-brand-primary/80">
            Infrastructure Partner
          </span>
        </div>
      </div>

      {/* Hover External Icon */}
      <div className="absolute right-6 top-6 translate-x-2 translate-y-[-8px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
        <ExternalLink size={12} className="text-brand-primary/40" />
      </div>
    </a>
  );
};

const Partners: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-32" id="partners">
      {/* Technical Grid Background Decor */}
      <div className="absolute inset-0 -z-10 opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Atmosphere Glow */}
      <div className="absolute left-1/2 top-1/2 -z-20 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/[0.02] blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-24 text-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary shadow-[0_0_40px_rgba(16,185,129,0.1)]">
            <ShieldCheck size={16} className="animate-pulse" />
            Verified Network Nodes
          </div>
          
          <h2 className="mb-8 text-6xl font-[900] leading-[0.85] tracking-tighter text-white md:text-8xl">
            Integrated with the <br />
            <span className="text-brand-primary italic">Global Elite.</span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
            Our infrastructure is hardened through direct integration with the industry's 
            most critical security and cloud providers. <span className="text-white">Active redundancy</span> is standard.
          </p>
        </div>

        {/* The Badge Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} partner={partner} />
          ))}
        </div>

        {/* Global Status Indicator */}
        <div className="mt-32 flex flex-col items-center justify-center gap-8 opacity-20 transition-all duration-1000 hover:opacity-100 group">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-brand-primary/50 to-transparent transition-all duration-1000 group-hover:w-80" />
          <div className="flex items-center gap-4">
            <Cpu size={14} className="text-brand-primary animate-float" />
            <span className="text-[10px] font-black uppercase tracking-[1.5em] text-slate-500 translate-x-[0.75em]">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
