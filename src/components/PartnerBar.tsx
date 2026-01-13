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

const PartnerBar: React.FC = () => {
  return (
    <div className="py-20 border-y border-white/[0.05] bg-brand-950/50 relative overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex justify-center">
        <div className="glass px-6 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-[0.3em] text-slate-500 border-white/5">
          Enterprise Standards Approved
        </div>
      </div>
      
      <div className="flex animate-scroll whitespace-nowrap">
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <div key={index} className="flex items-center mx-16 opacity-30 hover:opacity-100 transition-opacity duration-500 grayscale group">
             <img 
               src={partner.logo} 
               alt={partner.name} 
               className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-110"
             />
          </div>
        ))}
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-950 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-950 to-transparent z-10"></div>
    </div>
  );
};

export default PartnerBar;