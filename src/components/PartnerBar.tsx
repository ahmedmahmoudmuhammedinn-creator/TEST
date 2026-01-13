import React from 'react';

const partners = [
  { name: 'Sophos', logo: '/assets/partners/sophos.svg' },
  { name: 'Fortinet', logo: '/assets/partners/fortinet.svg' },
  { name: 'AWS', logo: '/assets/partners/aws.svg' },
  { name: 'Azure', logo: '/assets/partners/azure.svg' },
  { name: 'Google Cloud', logo: '/assets/partners/google-cloud.svg' },
  { name: 'Bitdefender', logo: '/assets/partners/bitdefender.svg' },
  { name: 'Microsoft', logo: '/assets/partners/microsoft.svg' },
  { name: 'Cloudflare', logo: '/assets/partners/cloudflare.svg' },
  { name: 'Datadog', logo: '/assets/partners/datadog.svg' },
  { name: 'HashiCorp', logo: '/assets/partners/hashicorp.svg' },
];

const PartnerBar: React.FC = () => {
  return (
    <section className="py-24 bg-black border-y border-white/[0.05] relative overflow-hidden group">
      <div className="container mx-auto px-6 mb-16 flex justify-center">
        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-card border-brand-primary/10">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Trusted Infrastructure Partners
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
        </div>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center py-4">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="flex items-center justify-center mx-12 md:mx-20"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                className="h-9 md:h-11 w-auto object-contain logo-normalize select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default PartnerBar;