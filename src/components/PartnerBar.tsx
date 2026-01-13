import React from 'react';

// Using structured data for partner logos. 
// Paths should be replaced with actual local SVG assets in a production environment.
const partners = [
  { name: 'Sophos', logo: 'https://cdn.worldvectorlogo.com/logos/sophos.svg' },
  { name: 'Fortinet', logo: 'https://cdn.worldvectorlogo.com/logos/fortinet.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
  { name: 'Azure', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
  { name: 'Bitdefender', logo: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg' },
  { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
  { name: 'Cloudflare', logo: 'https://cdn.worldvectorlogo.com/logos/cloudflare.svg' },
  { name: 'Datadog', logo: 'https://cdn.worldvectorlogo.com/logos/datadog.svg' },
  { name: 'HashiCorp', logo: 'https://cdn.worldvectorlogo.com/logos/hashicorp.svg' },
];

const PartnerBar: React.FC = () => {
  return (
    <section className="py-24 bg-black border-y border-white/[0.05] relative overflow-hidden group">
      {/* Background Section Header */}
      <div className="container mx-auto px-6 mb-16 flex justify-center">
        <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full glass-card border-brand-primary/10">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Trusted Infrastructure Partners
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></div>
        </div>
      </div>
      
      {/* Optimized Infinite Scroll Marquee */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap items-center py-4">
          {/* Duplicate the array 3 times to ensure no gaps at any screen width */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="flex items-center justify-center mx-12 md:mx-20"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`} 
                title={partner.name}
                className="h-9 md:h-11 w-auto object-contain logo-normalize select-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Dynamic Edge Fading Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default PartnerBar;