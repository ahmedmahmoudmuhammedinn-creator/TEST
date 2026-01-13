import React from 'react';

const partners = [
  { name: 'Sophos', logo: 'https://cdn.worldvectorlogo.com/logos/sophos.svg' },
  { name: 'Fortinet', logo: 'https://cdn.worldvectorlogo.com/logos/fortinet.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
  { name: 'Azure', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
  { name: 'Bitdefender', logo: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg' },
  { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
  { name: 'Cloudflare', logo: 'https://cdn.worldvectorlogo.com/logos/cloudflare.svg' },
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-brand-black border-y border-brand-border/30 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-primary/50">
          Trusted by Industry Leaders & Pioneers
        </span>
      </div>

      <div className="flex relative overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
          {/* Double map for seamless loop */}
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="inline-flex items-center justify-center mx-12 md:mx-20"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="h-7 md:h-9 w-auto object-contain logo-normalize"
              />
            </div>
          ))}
        </div>

        {/* Gradient edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Partners;