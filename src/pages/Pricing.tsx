
import React from 'react';
import { Check, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Navbar from '../components/Navbar'; // Assuming you extract Nav to its own component

const PricingPage: React.FC = () => {
  const tiers = [
    {
      name: 'Starter',
      price: '$499',
      description: 'Ideal for early-stage startups needing stable infrastructure.',
      features: ['Managed AWS/Azure Node', '24/7 Monitoring', 'Basic Security Audit', 'Slack Support (9-5)', 'Weekly Backups'],
      icon: <Zap className="text-brand-primary" />,
      cta: 'Start Free Trial',
      featured: false
    },
    {
      name: 'Business',
      price: '$1,499',
      description: 'For scaling teams that require high availability and security.',
      features: ['Multi-region Deployment', 'SOC2 Compliance Pack', 'Custom CI/CD Pipelines', 'Priority Support (24/7)', 'Daily Disaster Recovery'],
      icon: <Shield className="text-brand-primary" />,
      cta: 'Deploy Platform',
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Total infrastructure control for global corporations.',
      features: ['Dedicated DevSecOps Team', 'Zero Trust Architecture', 'Unlimited Cloud Credits', 'White-glove Migration', 'Custom SLA Agreement'],
      icon: <Globe className="text-brand-primary" />,
      cta: 'Contact Sales',
      featured: false
    }
  ];

  const faqs = [
    { q: "How does the 14-day trial work?", a: "You get full access to our Starter tier infrastructure. No credit card is required to begin." },
    { q: "Can we migrate our existing AWS stack?", a: "Yes, our team specializes in white-glove migrations with zero downtime guarantees." },
    { q: "Do you offer SOC2 compliance assistance?", a: "The Business and Enterprise tiers include dedicated resources to help your team pass audits." },
    { q: "What is your typical response time?", a: "Priority support customers see initial response times under 15 minutes for critical issues." }
  ];

  return (
    <div className="bg-brand-black min-h-screen text-slate-300 pb-32">
      <div className="pt-48 pb-20 text-center container mx-auto px-6">
        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
          Predictable <br/><span className="text-emerald-gradient">pricing.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          No hidden fees. No egress surprises. Scale your infrastructure with absolute financial clarity.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-7xl grid md:grid-cols-3 gap-8 mb-40">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`glass-card p-12 rounded-[3rem] relative flex flex-col ${
              tier.featured ? 'border-brand-primary/40 ring-1 ring-brand-primary/20' : ''
            }`}
          >
            {tier.featured && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center mb-6">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
              <p className="text-sm text-slate-500 mb-6">{tier.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-slate-500">/mo</span>}
              </div>
            </div>

            <ul className="space-y-4 mb-12 flex-1">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-400">
                  <Check size={16} className="text-brand-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group ${
              tier.featured ? 'btn-primary' : 'glass-card text-white hover:border-brand-primary/50'
            }`}>
              {tier.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <section className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-black text-white mb-16 text-center tracking-tight">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqs.map(faq => (
            <div key={faq.q} className="glass-card p-8 rounded-3xl">
              <h4 className="text-lg font-bold text-white mb-3">{faq.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
