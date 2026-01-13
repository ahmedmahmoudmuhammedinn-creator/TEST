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
  { name: 'Datadog', logo: 'https://cdn.worldvectorlogo.com/logos/datadog.svg' },
  { name: 'HashiCorp', logo: 'https://cdn.worldvectorlogo.com/logos/hashicorp.svg' },
  { name: 'Docker', logo: 'https://cdn.worldvectorlogo.com/logos/docker-3.svg' },
  { name: 'Kubernetes', logo: 'https://cdn.worldvectorlogo.com/logos/kubernetes.svg' },
];

const Partners: React.FC = () => {
  return (
    <section className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-brand-primary/10"></div>
          <span className="text-[10px] font-black uppercase tracking-[1em] text-slate-500 translate-x-[0.5em]">
            Strategic Ecosystem Partners
          </span>
          <div className="h-px w-12 bg-brand-primary/10"></div>
        </div>
      </div>

      <div className="flex relative overflow-hidden group py-4">
        {/* Continuous Marquee Container */}
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {/* We duplicate the array to create the infinite loop effect */}
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`} 
              className="inline-flex items-center justify-center mx-16 md:mx-24"
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} - LINCO Verified Partner`}
                className="h-10 md:h-12 w-auto object-contain logo-normalize grayscale select-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Dynamic Shadow Gradients for Edge Fading */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Partners;