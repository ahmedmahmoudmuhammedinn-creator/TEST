import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "h-10" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 160 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LINCO"
    >
      {/* L */}
      <path 
        d="M15 10 V40 H38" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* i (Body) */}
      <path 
        d="M55 22 V40" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
      />
      {/* i (Red Dot) */}
      <circle cx="55" cy="12" r="5" fill="#ef4444" stroke="none" />
      
      {/* n */}
      <path 
        d="M75 22 V40 M75 28 Q75 20 90 20 Q105 20 105 32 V40" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* c */}
      <path 
        d="M142 35 Q145 40 135 40 Q122 40 122 30 Q122 20 135 20 Q145 20 142 25" 
        stroke="currentColor" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* o */}
      <circle cx="170" cy="30" r="10" stroke="currentColor" strokeWidth="6" />
      
      {/* End Dot (Red) */}
      <circle cx="192" cy="38" r="5" fill="#ef4444" stroke="none" />
      
      {/* Adjust viewBox to fit the extra width of 'o' and dot */}
      <script>
        {/* Dynamic adjust if needed, but fixed viewBox 0 0 210 50 covers it */}
      </script>
    </svg>
  );
};

// Re-export with a fixed viewBox optimized for the letters
export const BrandLogoOptimized: React.FC<BrandLogoProps> = ({ className = "h-10" }) => (
    <svg 
      className={className} 
      viewBox="0 0 210 55" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 12V42H35" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
        
        <path d="M55 24V42" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
        <circle cx="55" cy="12" r="6" fill="#ef4444" />
        
        <path d="M80 24V42M80 28C80 28 80 22 96 22C112 22 112 28 112 36V42" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
        
        <path d="M150 40C140 44 130 44 130 32C130 20 140 20 150 24" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
        
        <circle cx="180" cy="32" r="11" stroke="currentColor" strokeWidth="7" />
        
        <circle cx="202" cy="40" r="6" fill="#ef4444" />
    </svg>
);

export default BrandLogoOptimized;
