import React, { useState, useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Partners from "./components/Partners";
import AIChatBot, { AIChatBotHandle } from "./components/AIChatBot";
import Footer from "./components/Footer";
import StatsChart from "./components/StatsChart";
import { Menu, X, Terminal, LogIn, ArrowRight } from "lucide-react";

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatRef = useRef<AIChatBotHandle>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAskAI = (serviceTitle: string) => {
    chatRef.current?.askAI(`Tell me about ${serviceTitle} and how it improves operational efficiency.`);
  };

  return (
    <div className="bg-brand-black min-h-screen text-slate-300">
      {/* SaaS Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="container mx-auto px-6 flex justify-center">
          <div className={`flex items-center justify-between w-full max-w-6xl glass-card rounded-full px-8 py-2.5 shadow-2xl transition-all ${
            isScrolled ? 'border-brand-primary/30 shadow-brand-primary/5' : 'border-transparent'
          }`}>
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-bold transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Terminal size={20} />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">LINCO</span>
            </a>

            <div className="hidden md:flex items-center gap-2">
              {['Services', 'About', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-all">
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a href="https://mail.linco.network" className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-colors">
                <LogIn size={14} />
                Client Access
              </a>
              <a href="#contact" className="btn-primary px-8 py-2.5 rounded-full text-xs uppercase tracking-widest">
                Deploy Now
              </a>
              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`md:hidden absolute top-full left-6 right-6 mt-4 glass-card rounded-3xl overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="p-8 flex flex-col gap-4">
            {['Services', 'About', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xl text-white font-bold hover:text-brand-primary" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <Partners />
        
        <section id="services">
          <Services onAskAI={handleAskAI} />
        </section>

        {/* Analytics Section */}
        <section id="about" className="py-40 relative overflow-hidden bg-[#050505]">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                  Engineered for <br /><span className="text-brand-primary">Velocity.</span>
                </h2>
                <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl">
                  We don't just host servers. We build high-performance distributed systems that empower your team to ship faster and scale globally without friction.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="text-4xl font-black text-brand-primary mb-2">99.9%</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Global Uptime</div>
                  </div>
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="text-4xl font-black text-brand-primary mb-2">~12ms</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Edge Latency</div>
                  </div>
                </div>
              </div>
              <div className="relative group p-1 bg-brand-border rounded-[2.5rem]">
                <StatsChart />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="glass-card p-16 md:p-32 rounded-[4rem] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter">Ready to scale?</h2>
                <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto">
                  Join 200+ companies already building their future on LINCO's intelligent infrastructure.
                </p>
                <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-10" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Enter work email" className="flex-1 bg-brand-black/50 border border-brand-primary/10 rounded-full px-10 py-5 text-white focus:outline-none focus:border-brand-primary transition-all" />
                  <button className="btn-primary px-12 py-5 rounded-full flex items-center justify-center gap-3">
                    Deploy Platform <ArrowRight size={20} />
                  </button>
                </form>
                <div className="flex justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
                  <div className="flex items-center gap-2">✓ No Credit Card</div>
                  <div className="flex items-center gap-2">✓ 14 Day Trial</div>
                  <div className="flex items-center gap-2">✓ SOC2 Ready</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIChatBot ref={chatRef} />
    </div>
  );
};

export default App;