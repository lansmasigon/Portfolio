import './Home.css';
import heroHead from '../assets/Masigon_LanceGabriel.png';
import { Rocket, Facebook, Mail, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [introPhase, setIntroPhase] = useState('show');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const morphTimer = setTimeout(() => setIntroPhase('morph'), 1100);
    const doneTimer = setTimeout(() => {
      setIntroPhase('done');
      document.body.style.overflow = 'auto';
    }, 2350);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section id="home" className={`home-section ${introPhase === 'show' ? 'intro-active' : ''}`}>
      {introPhase !== 'done' && (
        <div className={`home-intro ${introPhase === 'morph' ? 'home-intro--morph' : ''}`} aria-hidden="true">
          <div className="home-intro-title">HI, I'M LANCE</div>
        </div>
      )}

      <div className="home-shell">
        <div className="home-ornament home-ornament-rocket" aria-hidden="true">
          <Rocket className="home-ornament-icon" />
        </div>

        <div className="home-socials" aria-label="Social links">
            <a href="#contact" className="contact-pill">Contact Me</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="mailto:hello@example.com" aria-label="Email">
            <Mail size={16} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
        </div>

        <nav className="home-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#testimonials">Projects</a>
          <a href="#projects">Awards</a>
          <a href="#contact">Contact</a>
        </nav>

        <h1 className="hero-title" aria-label="Hi, I am Lance">
          <span>HI,</span>
          <span>I'M</span>
          <span>LANCE</span>
        </h1>

        <div className="hero-stage">
          <div className="hero-left">
            <p>A FRONTEND DEVELOPER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS</p>
          </div>

          <img src={heroHead} alt="Lance Gabriel Masigon" className="hero-head" />

          <div className="hero-right">
        
          </div>
        </div>
      </div>
    </section>
  );
}
