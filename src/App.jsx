import './index.css';
import { useEffect } from 'react';
import SideNav from './components/SideNav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Awards from './components/Awards';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';

function App() {
  useEffect(() => {
    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));

    // Side nav active state
    const navButtons = document.querySelectorAll('.side-nav button');
    const sections = Array.from(navButtons).map(b => document.getElementById(b.dataset.target)).filter(Boolean);

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const navIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const btn = document.querySelector('.side-nav button[data-target="' + entry.target.id + '"]');
        if(!btn) return;
        if(entry.isIntersecting){
          navButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => navIO.observe(s));
    
  }, []);

  return (
    <>
      <ThemeToggle />
      <SideNav />
      <main className="wrap">
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Awards />
        <GitHub />
        <Contact />
      </main>
    </>
  );
}

export default App;