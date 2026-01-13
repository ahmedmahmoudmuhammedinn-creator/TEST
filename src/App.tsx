import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Partners from "./components/Partners";
import ContactForm from "./components/ContactForm";
import PricingPage from "./pages/Pricing";
import AIChatBot, { AIChatBotHandle } from "./components/AIChatBot";
import Footer from "./components/Footer";
import StatsChart from "./components/StatsChart";
import { Menu, X, Terminal, LogIn, Send } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navigation = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: any) => (
  <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
    <div className="container mx-auto px-6 flex justify-center">
      <div className={`flex items-center justify-between w-full max-w-6xl glass-card rounded-full px-8 py-3 shadow-2xl transition-all ${
        isScrolled ? 'border-brand-primary/30 shadow-brand-primary/10' : 'border-white/5'
      }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform">
            <Terminal size={22} />
          </div>
          <span className="text-white font-black text-2xl tracking-tighter">LINCO</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {['Home', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-all"
            >
              {item}
            </Link>
          ))}
          <a href="#services" className="px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-all">Services</a>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://mail.linco.network" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-colors">
            <LogIn size={14} /> Client Area
          </a>
          <Link to="/pricing" className="btn-primary px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-brand-primary/20">
            Deploy Now
          </Link>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const HomePage = ({ handleAskAI }: any) => (
  <main className="animate-fade-up">
    <Hero />
    <Partners />
    <section id="services">
      <Services onAskAI={handleAskAI} />
    </section>
    
    <section className="py-40 bg-brand-black/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
              Metrics for <br/><span className="text-brand-primary">Growth.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              We engineer low-latency environments that give your engineering teams the stability required to scale without friction.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-card p-10 rounded-3xl">
                <div className="text-5xl font-black text-brand-primary mb-2 tracking-tight">99.99%</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Service Reliability</div>
              </div>
              <div className="glass-card p-10 rounded-3xl">
                <div className="text-5xl font-black text-brand-primary mb-2 tracking-tight">~8ms</div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Global Response</div>
              </div>
            </div>
          </div>
          <div className="relative p-1 bg-brand-border rounded-[3rem]">
            <StatsChart />
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="py-40 container mx-auto px-6">
      <ContactForm />
    </section>
  </main>
);

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
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-brand-black min-h-screen">
        <Navigation 
          isScrolled={isScrolled} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
        
        <Routes>
          <Route path="/" element={<HomePage handleAskAI={handleAskAI} />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<section className="pt-40 pb-20 container mx-auto px-6"><ContactForm /></section>} />
        </Routes>

        <Footer />
        <AIChatBot ref={chatRef} />
      </div>
    </BrowserRouter>
  );
};

export default App;