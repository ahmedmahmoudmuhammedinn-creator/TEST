import React from 'react';

// Using WorldVectorLogo for high-quality SVGs ensures crisp rendering on all screens
const partners = [
  { name: 'Sophos', logo: 'https://cdn.worldvectorlogo.com/logos/sophos.svg' },
  { name: 'Fortinet', logo: 'https://cdn.worldvectorlogo.com/logos/fortinet.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-web-services-2.svg' },
  { name: 'Azure', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-azure-3.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/google-cloud-1.svg' },
  { name: 'Bitdefender', logo: 'https://cdn.worldvectorlogo.com/logos/bitdefender-1.svg' },
  { name: 'Kaspersky', logo: 'https://cdn.worldvectorlogo.com/logos/kaspersky-1.svg' },
  { name: 'Autodesk', logo: 'https://cdn.worldvectorlogo.com/logos/autodesk-1.svg' },
  { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
  { name: 'Adobe Creative Cloud', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-creative-cloud-2.svg' },
];

const PartnerBar: React.FC = () => {
  return (
    <div className="bg-slate-950 py-12 border-b border-slate-900 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-[0.2em]">
          Strategic Technology Partners
        </p>
      </div>
      
      <div className="relative w-full flex items-center max-w-[100vw]">
        {/* Gradient overlays to smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
        
        <div className="flex animate-scroll whitespace-nowrap hover:[animation-play-state:paused] items-center">
           {/* Loop the list multiple times to ensure infinite scroll effect on large screens */}
           {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
             <div 
               key={`${partner.name}-${index}`} 
               className="mx-4 md:mx-6 p-4 rounded-xl border border-transparent hover:border-cyan-500/30 hover:bg-slate-900/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 group cursor-pointer flex items-center justify-center min-w-[140px]"
             >
               <div className="relative h-10 md:h-12 w-auto flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                 <img 
                   src={partner.logo} 
                   alt={`${partner.name} logo`} 
                   className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out"
                   loading="lazy"
                   onError={(e) => {
                     // Fallback to text if SVG fails to load
                     e.currentTarget.style.display = 'none';
                     const parent = e.currentTarget.parentElement;
                     if (parent) {
                       // Check if text node already exists to avoid duplicates
                       if (!parent.querySelector('.fallback-text')) {
                         const span = document.createElement('span');
                         span.innerText = partner.name;
                         span.className = "fallback-text text-lg font-bold text-slate-500 group-hover:text-white transition-colors";
                         parent.appendChild(span);
                       }
                     }
                   }}
                 />
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerBar;