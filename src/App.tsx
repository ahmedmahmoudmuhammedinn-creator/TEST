import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import PartnerBar from "./components/PartnerBar";
import ContactForm from "./components/ContactForm";
import PricingPage from "./pages/Pricing";
import AIChatBot, { AIChatBotHandle } from "./components/AIChatBot";
import Footer from "./components/Footer";
import StatsChart from "./components/StatsChart";
import { Menu, X, Terminal } from "lucide-react";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const Navigation = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen }: any) => (
  <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}>
    <div className="container mx-auto px-6 flex justify-center">
      <div className={`flex items-center justify-between w-full max-w-6xl glass-card rounded-full px-8 py-2.5 transition-all ${
        isScrolled ? 'border-brand-primary/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border-transparent'
      }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-black font-black group-hover:scale-105 transition-transform">
            <Terminal size={20} />
          </div>
          <span className="text-white font-black text-xl tracking-tighter uppercase">LINCO</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {['Home', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:text-brand-primary transition-colors"
            >
              {item}
            </Link>
          ))}
          <a href="#services" className="px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:text-brand-primary transition-colors">Services</a>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/pricing" className="bg-brand-primary text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-hover transition-colors shadow-lg shadow-brand-primary/20">
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
        <Navigation isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <PartnerBar />
              <section id="services"><Services onAskAI={handleAskAI} /></section>
              <section className="py-40 bg-brand-black/50">
                <div className="container mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                      <h2 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.85]">Engineered for <br/><span className="text-brand-primary">Growth.</span></h2>
                      <div className="grid grid-cols-2 gap-6 mt-12">
                        <div className="glass-card p-8 rounded-3xl border-brand-primary/10">
                          <div className="text-5xl font-black text-brand-primary mb-2 tracking-tighter">99.9%</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Global Uptime</div>
                        </div>
                        <div className="glass-card p-8 rounded-3xl border-brand-primary/10">
                          <div className="text-5xl font-black text-brand-primary mb-2 tracking-tighter">&lt;8ms</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latency</div>
                        </div>
                      </div>
                    </div>
                    <StatsChart />
                  </div>
                </div>
              </section>
              <section id="contact" className="py-40 container mx-auto px-6 max-w-6xl">
                <ContactForm />
              </section>
            </main>
          } />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>

        <Footer />
        <AIChatBot ref={chatRef} />
      </div>
    </BrowserRouter>
  );
};

export default App;