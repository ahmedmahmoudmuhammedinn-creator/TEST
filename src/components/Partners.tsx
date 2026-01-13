import React from 'react';

const partners = [
  { name: 'Sophos', logo: 'https://cdn.worldvectorlogo.com/logos/sophos.svg' },
  { name: 'Fortinet', logo: 'https://cdn.worldvectorlogo.com/logos/fortinet.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
  { name: 'Azure', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
  { name: 'Bitdefender', logo: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg' },
  { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
];

const Partners: React.FC = () => {
  return (
    <div className="py-24 bg-brand-black border-y border-brand-border/50 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-brand-primary/60">
          Trusted by Industry Leaders & Pioneers
        </span>
      </div>

      <div className="flex relative overflow-hidden group">
        {/* Continuous Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={index} 
              className="inline-flex items-center justify-center mx-12 md:mx-20"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-7 md:h-10 w-auto object-contain opacity-40 grayscale brightness-200 transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:brightness-100 hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Masking Gradients for Smooth Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Partners;