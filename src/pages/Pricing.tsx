import React from 'react';
import { Check, ArrowRight, Zap, Shield, Globe, HelpCircle } from 'lucide-react';

const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Starter',
      price: '$499',
      description: 'Ideal for early-stage startups needing stable infrastructure.',
      features: ['Single-Region AWS/Azure', '24/7 Endpoint Monitoring', 'Standard Security Audit', 'Slack Support (9-5)', 'Daily Data Backups'],
      icon: <Zap className="text-brand-primary" />,
      cta: 'Begin Trial',
      featured: false
    },
    {
      name: 'Business',
      price: '$1,499',
      description: 'Scaling teams requiring multi-region redundancy and SOC2.',
      features: ['Multi-Region Clusters', 'SOC2 Compliance Suite', 'Custom CI/CD Pipelines', 'Dedicated Support (24/7)', 'Zero-Downtime Migration'],
      icon: <Shield className="text-brand-primary" />,
      cta: 'Scale Platform',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full infrastructure control for global scale operations.',
      features: ['Private Cloud Deployment', 'Zero-Trust Architecture', 'Infinite Auto-scaling', 'White-Glove Onboarding', 'Bespoke SLA Agreement'],
      icon: <Globe className="text-brand-primary" />,
      cta: 'Consult Sales',
      featured: false
    }
  ];

  const faqs = [
    { q: "Is migration included in the plans?", a: "Yes, Business and Enterprise plans include full architectural migration led by our senior engineers." },
    { q: "What cloud providers do you support?", a: "We are certified partners of AWS, Google Cloud, and Microsoft Azure." },
    { q: "Can we downgrade or cancel anytime?", a: "Starter and Business plans are month-to-month. Enterprise plans are customized per annual contract." }
  ];

  return (
    <div className="bg-brand-black min-h-screen text-slate-300 pb-40 relative">
      {/* Decorative Orbs - Pointer events none to allow clicks through them */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="pt-48 pb-20 text-center container mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-10">
          Transparent Billing
        </div>
        <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
          Predictable <br/><span className="text-emerald-gradient">investments.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Scale your infrastructure without egress fee surprises or hidden operational costs.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-3 gap-8 mb-40">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`glass-card p-12 rounded-[3.5rem] relative flex flex-col transition-all duration-500 hover:scale-[1.02] ${
              tier.featured ? 'border-brand-primary/50 ring-1 ring-brand-primary/30 shadow-[0_20px_50px_rgba(16,185,129,0.1)]' : ''
            }`}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20 z-20">
                Performance Pick
              </div>
            )}
            
            <div className="mb-10 relative z-10">
              <div className="w-14 h-14 glass-card rounded-2xl flex items-center justify-center mb-8 border-brand-primary/20">
                {tier.icon}
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight uppercase italic">{tier.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">{tier.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black text-white tracking-tighter">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">/ month</span>}
              </div>
            </div>

            <ul className="space-y-5 mb-14 flex-1 relative z-10">
              {tier.features.map(f => (
                <li key={f} className="flex items-start gap-4 text-sm font-semibold text-slate-400">
                  <Check size={18} className="text-brand-primary shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <a 
              href="/#contact" 
              className={`w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group relative z-20 active:scale-95 ${
                tier.featured 
                  ? 'bg-brand-primary text-black shadow-lg shadow-brand-primary/20 hover:bg-brand-hover' 
                  : 'glass-card text-white hover:border-brand-primary/50 border-white/10'
              }`}
            >
              {tier.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        ))}
      </div>

      <section className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <HelpCircle size={32} className="text-brand-primary/40 mx-auto mb-6" />
          <h2 className="text-4xl font-black text-white tracking-tight uppercase italic">Support Intel</h2>
        </div>
        <div className="space-y-4">
          {faqs.map(faq => (
            <div key={faq.q} className="glass-card p-8 rounded-[2rem] border-brand-primary/5 hover:border-brand-primary/20 transition-colors">
              <h4 className="text-lg font-black text-white mb-3 tracking-tight">{faq.q}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;