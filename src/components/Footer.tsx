import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">LI N C O</h2>
            <p className="mb-6 leading-relaxed">
              Empowering businesses with next-generation IT solutions. We build the digital foundation for your future success.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/linco.eg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              {/* Added generic placeholder for potential future Facebook/Twitter if needed, mostly kept Instagram as primary based on request */}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cloud Migration</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Custom Development</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">IT Consulting</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Case Studies</a></li>
              <li><a href="http://linco.network" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">linco.network</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-white">Email:</span>
                <a href="mailto:Info@linco.network" className="hover:text-cyan-400">Info@linco.network</a>
              </li>
              <li className="flex gap-3">
                <span className="text-white">Phone:</span>
                <a href="tel:+201140073905" className="hover:text-cyan-400">+20 11 40073905</a>
              </li>
              <li className="flex gap-3">
                <span className="text-white">Address:</span>
                <span>Maadi 9 street, Cairo, Egypt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} LI N C O. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <button 
            onClick={scrollToTop}
            className="p-3 bg-slate-900 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;