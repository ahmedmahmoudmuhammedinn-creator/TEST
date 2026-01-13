
import React from 'react';

// Centralized partner data
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
    <section className="py-24 bg-brand-black border-y border-brand-border/50 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="h-px w-8 bg-brand-primary/20"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-primary/40">
            Trusted by the world's most innovative teams
          </span>
          <div className="h-px w-8 bg-brand-primary/20"></div>
        </div>
      </div>

      <div className="flex relative overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-8 items-center">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="inline-flex items-center justify-center mx-16 md:mx-24"
              title={partner.name}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} Logo`}
                // Normalization: Fixed height, pure white filter (brightness-200 + invert), 
                // transitioning to natural colors on hover.
                className="h-8 md:h-10 w-auto object-contain transition-all duration-700 opacity-30 grayscale invert brightness-200 group-hover:opacity-10 hover:!opacity-100 hover:!grayscale-0 hover:!invert-0 hover:!brightness-100 hover:scale-110 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Professional fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Partners;
