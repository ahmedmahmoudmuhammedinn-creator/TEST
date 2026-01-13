
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
import { Menu, X, Terminal, LogIn, ArrowRight } from "lucide-react";

// Helper component to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navigation = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: any) => (
  <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
    <div className="container mx-auto px-6 flex justify-center">
      <div className={`flex items-center justify-between w-full max-w-6xl glass-card rounded-full px-8 py-2.5 shadow-2xl transition-all ${
        isScrolled ? 'border-brand-primary/30 shadow-brand-primary/5' : 'border-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-bold transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Terminal size={20} />
          </div>
          <span className="text-white font-black text-xl tracking-tighter">LINCO</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-all">Home</Link>
          <Link to="/pricing" className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-all">Pricing</Link>
          <a href="/#services" className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:text-brand-primary transition-all">Services</a>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://mail.linco.network" className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-primary transition-colors">
            <LogIn size={14} /> Client Access
          </a>
          <Link to="/pricing" className="btn-primary px-8 py-2.5 rounded-full text-xs uppercase tracking-widest">Deploy Now</Link>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  </nav>
);

const HomePage = ({ handleAskAI }: any) => (
  <main>
    <Hero />
    <Partners />
    <section id="services">
      <Services onAskAI={handleAskAI} />
    </section>
    <section id="about" className="py-40 relative overflow-hidden bg-[#050505]">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">Engineered for <br /><span className="text-brand-primary">Velocity.</span></h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl">We build high-performance distributed systems that empower your team to ship faster and scale globally without friction.</p>
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
      <div className="bg-brand-black min-h-screen text-slate-300">
        <Navigation 
          isScrolled={isScrolled} 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
        
        <Routes>
          <Route path="/" element={<HomePage handleAskAI={handleAskAI} />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>

        <Footer />
        <AIChatBot ref={chatRef} />
      </div>
    </BrowserRouter>
  );
};

export default App;
