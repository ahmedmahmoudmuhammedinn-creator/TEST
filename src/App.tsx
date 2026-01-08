import React, { useState, useEffect, useRef } from "react";

import Hero from "./components/Hero";
import Services from "./components/Services";
import PartnerBar from "./components/PartnerBar";
import AIChatBot, { AIChatBotHandle } from "./components/AIChatBot";
import Footer from "./components/Footer";
import StatsChart from "./components/StatsChart";

import {
  Menu,
  X,
  Code2,
  Phone,
  Mail,
  MapPin,
  LogIn,
  ChevronRight,
  ArrowRight
} from "lucide-react";


const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const chatRef = useRef<AIChatBotHandle>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAskAI = (serviceTitle: string) => {
    if (chatRef.current) {
      chatRef.current.askAI(`Tell me more about your ${serviceTitle} services. What specific value does it provide to a business?`);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 font-inter">
      {/* Navigation Wrapper */}
      <div className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-2xl shadow-blue-900/5' : ''
      }`}>
        
        {/* Top Info Bar - Collapses on scroll */}
        <div className={`bg-slate-900 border-b border-slate-800 text-slate-400 overflow-hidden transition-all duration-500 ease-in-out ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}>
          <div className="container mx-auto px-6 h-10 flex justify-between items-center text-[11px] md:text-xs font-medium uppercase tracking-wide">
             <div className="flex items-center gap-4 md:gap-6">
                <a href="mailto:Info@linco.network" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                   <Mail size={12} />
                   <span className="hidden sm:inline">Info@linco.network</span>
                   <span className="sm:hidden">Email Us</span>
                </a>
                <div className="w-px h-3 bg-slate-700"></div>
                <a href="tel:+201140073905" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                   <Phone size={12} />
                   <span>+20 11 40073905</span>
                </a>
             </div>
             <div className="hidden md:flex items-center gap-2 text-slate-500">
                <MapPin size={12} />
                <span>Maadi 9 street, Cairo, Egypt</span>
             </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav 
          className={`w-full transition-all duration-300 border-b relative ${
            isScrolled 
              ? 'bg-slate-950/90 backdrop-blur-md py-3 border-slate-800' 
              : 'bg-transparent py-5 border-transparent'
          }`}
        >
          {/* Background gradient for un-scrolled state to ensure text readability if hero is bright */}
          {!isScrolled && (
             <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-transparent pointer-events-none"></div>
          )}

          <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
            {/* 1. Logo Section */}
            <a href="#" className="flex items-center gap-3 group relative z-20">
              <div className="relative w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center overflow-hidden group-hover:border-cyan-500/50 transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Code2 size={22} className="text-blue-400 group-hover:text-cyan-300 transition-colors relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tighter leading-none flex items-center gap-1">
                  LI N C O
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                </span>
              </div>
            </a>

            {/* 2. Center Navigation Capsule (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full p-1.5 shadow-xl shadow-black/20">
                  {['Home', 'Services', 'About'].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`} 
                      className="px-6 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
                    >
                      {item}
                    </a>
                  ))}
               </div>
            </div>

            {/* 3. Right Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-4 relative z-20">
              <a href="#contact" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider px-2">
                <LogIn size={14} />
                <span>Login</span>
              </a>
              
              <a href="#contact" className="group pl-5 pr-4 py-2.5 bg-white text-slate-950 hover:bg-cyan-50 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-white/5 hover:shadow-cyan-400/20">
                Get Quote
                <div className="w-6 h-6 bg-slate-950 rounded-full flex items-center justify-center text-white group-hover:bg-cyan-600 transition-colors">
                   <ArrowRight size={12} />
                </div>
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4 relative z-20">
                 <a href="#contact" className="text-xs font-bold bg-blue-600 text-white px-3 py-2 rounded-lg">Get Quote</a>
                <button 
                  className="text-white p-2 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800/50"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-6 flex flex-col gap-2">
             {['Home', 'Services', 'About'].map((item) => (
               <a 
                 key={item}
                 href={`#${item.toLowerCase()}`} 
                 className="p-4 text-lg font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-xl transition-all flex items-center justify-between group" 
                 onClick={() => setMobileMenuOpen(false)}
               >
                 {item}
                 <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400"/>
               </a>
             ))}
             <div className="h-px bg-slate-800 my-4"></div>
             
             <div className="flex flex-col gap-3">
                 <a href="#contact" className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-white py-4 border border-slate-800 rounded-xl hover:bg-slate-900 transition-all font-medium" onClick={() => setMobileMenuOpen(false)}>
                   <LogIn size={18} />
                   Client Login
                 </a>
                 <div className="flex items-center justify-between text-slate-500 text-xs px-2 py-2">
                    <span>Cairo, Egypt</span>
                    <a href="tel:+201140073905" className="text-slate-400">+20 11 40073905</a>
                 </div>
             </div>
          </div>
        </div>
      </div>

      <main className="pt-24 md:pt-32">
        <Hero />
        
        <PartnerBar />
        
        <Services onAskAI={handleAskAI} />

        {/* Why Us Section with Chart */}
        <section id="about" className="py-24 bg-slate-900 border-y border-slate-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Data-Driven <br/>
                  <span className="text-blue-500">Performance</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  We don't just fix computers; we optimize entire ecosystems. Our clients see an average of 40% increase in operational efficiency within the first 6 months.
                </p>
                <div className="space-y-6">
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold text-xl">1</div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Analysis</h4>
                        <p className="text-slate-500">Deep dive into your current stack.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold text-xl">2</div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Strategy</h4>
                        <p className="text-slate-500">Custom tailored roadmaps.</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 font-bold text-xl">3</div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Execution</h4>
                        <p className="text-slate-500">Seamless implementation.</p>
                      </div>
                   </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <StatsChart />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-950 relative">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Start Your Transformation</h2>
                <p className="text-slate-400">Ready to upgrade your IT infrastructure? Reach out today.</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Name</label>
                    <input type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email</label>
                    <input type="email" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="john@company.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-sm font-medium text-slate-400">Service Interest</label>
                   <select className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none">
                      <option>Managed IT Services</option>
                      <option>Cloud Migration</option>
                      <option>Cybersecurity Audit</option>
                      <option>Custom Development</option>
                   </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Message</label>
                  <textarea rows={4} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Tell us about your project..."></textarea>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                  Send Message
                </button>
              </form>
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