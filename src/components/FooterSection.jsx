import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import sleepingAvatar from '../assets/sleeping.png';

export default function FooterSection() {
  const avatarRef = useRef(null);


  return (
    <footer id="contact" className="w-full h-[85vh] md:h-screen relative overflow-hidden flex flex-col justify-center items-center">
      
      {/* Contact Content Centered */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 pb-12 md:pb-20 w-full max-w-4xl">
        <h2 className="text-[clamp(2.5rem,5vw,6rem)] font-extrabold tracking-tighter mb-4 md:mb-6 text-gray-900 leading-tight">
          Let's build something<br />together.
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-4 md:mb-6 w-full justify-center">
          <a 
            href="mailto:lancemasigon@gmail.com"
            className="flex items-center gap-2 md:gap-3 bg-white/50 border border-gray-300 rounded-full px-3 md:px-5 py-2 md:py-2.5 text-gray-900 hover:border-blue-500/50 hover:bg-blue-50 transition-colors group text-xs md:text-sm"
          >
            <Mail className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            <span className="font-medium hidden md:inline">lancemasigon@gmail.com</span>
            <span className="font-medium md:hidden">Email</span>
          </a>
          
          <a 
            href="tel:09283412021"
            className="flex items-center gap-2 md:gap-3 bg-white/50 border border-gray-300 rounded-full px-3 md:px-5 py-2 md:py-2.5 text-gray-900 hover:border-blue-500/50 hover:bg-blue-50 transition-colors group text-xs md:text-sm"
          >
            <Phone className="w-3 h-3 md:w-4 md:h-4 text-gray-800 group-hover:text-blue-600 transition-colors flex-shrink-0" />
            <span className="font-medium hidden md:inline">09283412021</span>
            <span className="font-medium md:hidden">Call</span>
          </a>
        </div>

        <div className="flex items-center gap-3 md:gap-4 mb-16 md:mb-32 z-30 relative">
          {[
            { icon: Github, href: "https://github.com/lansmasigon", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/lancegabrielmasigon", label: "LinkedIn" },
            { icon: Instagram, href: "https://instagram.com/lansmasigon", label: "Instagram" },
            { icon: Facebook, href: "https://facebook.com/lansmasigon", label: "Facebook" }
          ].map((social, idx) => (
            <a 
              key={idx}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="p-2 md:p-3 rounded-full bg-white/50 border border-gray-300 text-gray-800 hover:text-blue-600 hover:border-blue-400 hover:scale-110 transition-all duration-300"
            >
              <social.icon className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Avatar positioned absolutely at the bottom with a negative offset */}
      <div className="absolute -bottom-12 md:-bottom-32 left-1/2 -translate-x-1/2 w-full max-w-[300px] md:max-w-[800px] flex justify-center items-end z-10 pointer-events-none">
        <img 
          ref={avatarRef}
          src={sleepingAvatar} 
          alt="Sleeping character" 
          className="w-full h-auto object-cover object-bottom drop-shadow-lg"
        />
      </div>
    </footer>
  );
}
