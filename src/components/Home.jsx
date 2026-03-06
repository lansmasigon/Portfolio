import './Home.css';
import heroHead from '../assets/Masigon_LanceGabriel.png';
import homebg from '../assets/homebg.png';
import { Facebook, Mail, Github, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Home() {
  const introRef = useRef(null);
  const shellRef = useRef(null);
  const titleRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroLeftRef = useRef(null);
  const heroHeadRef = useRef(null);
  const socialsRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const intro = introRef.current;
    const shell = shellRef.current;
    const title = titleRef.current;

    if (!intro || !shell || !title) return;

    document.body.style.overflow = 'hidden';

    // Hide shell initially via GSAP
    gsap.set(shell, { autoAlpha: 0, y: 18 });

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        document.body.style.overflow = 'auto';
        intro.style.display = 'none';
      },
    });

    tl
      // Phase 1: pause on intro title
      .to(title, {
        y: '-26vh',
        scale: 1.58,
        letterSpacing: '-0.01em',
        autoAlpha: 0,
        duration: 0.85,
        ease: 'power3.inOut',
        delay: 1.0,
      })
      .to(intro, { autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '<0.2')

      // Phase 2: reveal main shell
      .to(shell, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '<0.1')

      // Phase 3: stagger hero elements in
      .from(heroTitleRef.current?.querySelectorAll('span') ?? [], {
        y: 40, autoAlpha: 0, stagger: 0.1, duration: 0.6, ease: 'power3.out',
      }, '-=0.3')
      .from(heroLeftRef.current, { y: 20, autoAlpha: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .from(heroHeadRef.current, { y: 30, autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
      .from([
        ...(socialsRef.current ? Array.from(socialsRef.current.querySelectorAll('a')) : []),
        ...(navRef.current ? Array.from(navRef.current.querySelectorAll('a')) : []),
      ], {
        y: 10, autoAlpha: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out',
      }, '-=0.4');

    return () => {
      tl.kill();
      document.body.style.overflow = 'auto';
      // Restore visibility so second StrictMode mount starts clean
      gsap.set(shell, { autoAlpha: 1, y: 0 });
      gsap.set(intro, { autoAlpha: 1, clearProps: 'display' });
    };
  }, []);

  return (
    <section id="home" className="home-section">
      <img src={homebg} alt="" className="home-bg-img" aria-hidden="true" />

      <div className="home-intro" ref={introRef} aria-hidden="true">
        <div className="home-intro-title" ref={titleRef}>HI, I'M LANCE</div>
      </div>

      <div className="home-shell" ref={shellRef}>
        <div className="home-socials" ref={socialsRef} aria-label="Social links">
          <a href="#about" className="contact-pill">Contact Me</a>
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

        <nav className="home-nav" ref={navRef} aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#awards">Awards</a>
        </nav>

        <h1 className="hero-title" ref={heroTitleRef} aria-label="Hi, I am Lance">
          <span>HI,</span>
          <span>I'M</span>
          <span>LANCE</span>
        </h1>

        <div className="hero-stage">
          <div className="hero-left" ref={heroLeftRef}>
            <p>A FRONTEND DEVELOPER PASSIONATE ABOUT CRAFTING BOLD AND MEMORABLE PROJECTS</p>
          </div>
          <img src={heroHead} alt="Lance Gabriel Masigon" className="hero-head" ref={heroHeadRef} />
          <div className="hero-right"></div>
        </div>
      </div>
    </section>
  );
}
