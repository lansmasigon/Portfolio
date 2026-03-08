import './Home.css';
import heroHead from '../assets/Masigon_LanceGabriel.png';
import { Facebook, Mail, Github, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { animate, stagger } from 'animejs';

const NAME_CHARS = 'LANCE'.split('');

export default function Home() {
  const loaderRef   = useRef(null);
  const navRef      = useRef(null);
  const titleRef    = useRef(null);
  const heroImgRef  = useRef(null);
  const descriptRef = useRef(null);
  const metaRef     = useRef(null);
  const bgNumRef    = useRef(null);

  useEffect(() => {
    const loader = loaderRef.current;
    document.body.style.overflow = 'hidden';

    // Hide everything initially
    gsap.set([navRef.current, titleRef.current?.querySelectorAll('.hero-title-inner'),
      heroImgRef.current, descriptRef.current, metaRef.current, bgNumRef.current],
      { autoAlpha: 0 });

    // Phase 1: anime.js char-by-char loader animation
    animate(loader.querySelectorAll('.home-loader-char'), {
      translateY: ['120%', '0%'],
      opacity: [0, 1],
      ease: 'outExpo',
      duration: 900,
      delay: stagger(80, { start: 200 }),
      onComplete: () => {
        // Phase 2: hold, then sweep out
        setTimeout(() => {
          // chars fly up
          animate(loader.querySelectorAll('.home-loader-char'), {
            translateY: ['0%', '-130%'],
            opacity: [1, 0],
            ease: 'inExpo',
            duration: 600,
            delay: stagger(40),
          });
          // loader bar sweeps in then out
          animate(loader.querySelector('.home-loader-bar'), {
            width: ['0%', '100%'],
            ease: 'inOutQuart',
            duration: 500,
            onComplete: () => {
              gsap.to(loader, {
                scaleY: 0,
                transformOrigin: 'top',
                duration: 0.55,
                ease: 'power3.inOut',
                onComplete: () => {
                  loader.style.display = 'none';
                  document.body.style.overflow = 'auto';
                  revealHero();
                },
              });
            },
          });
        }, 1000);
      },
    });

    function revealHero() {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to(bgNumRef.current, { autoAlpha: 1, duration: 1 })
        .to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.1)
        .to(heroImgRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.2)
        .to(titleRef.current.querySelectorAll('.hero-title-inner'), {
            autoAlpha: 1,
            y: '0%',
            stagger: 0.1,
            duration: 0.8,
          }, 0.3)
        .to(descriptRef.current, { autoAlpha: 1, x: 0, duration: 0.7 }, 0.5)
        .to(metaRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.65);
    }

    // Subtle parallax on hero image
    const onScroll = () => {
      if (!heroImgRef.current) return;
      const sy = window.scrollY;
      heroImgRef.current.style.transform = `translateX(-50%) translateY(${sy * 0.18}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="home" className="home-section">

      {/* Loader */}
      <div className="home-loader" ref={loaderRef}>
        <div className="home-loader-name" aria-hidden="true">
          {NAME_CHARS.map((ch, i) => (
            <span key={i} className="home-loader-char">{ch}</span>
          ))}
        </div>
        <div className="home-loader-bar" />
      </div>

      {/* Navigation */}
      <nav className="home-nav" ref={navRef} aria-label="Primary navigation">
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#awards">Awards</a>
        </div>
      </nav>

      {/* Background decorative number — placed inside descriptor to align with socials */}
      <div className="hero-bg-number" ref={bgNumRef} aria-hidden="true">01</div>

      {/* Main title — spans full width, sits below nav behind the image */}
      <div className="hero-title-wrap" ref={titleRef} aria-label="Hi, I'm Lance">
        <h1 className="hero-main-title">
          <span className="hero-title-line"><span className="hero-title-inner">HI,</span></span>
          <span className="hero-title-line"><span className="hero-title-inner">I'M</span></span>
          <span className="hero-title-line"><span className="hero-title-inner hero-title-accent">LANCE</span></span>
        </h1>
      </div>

      {/* Hero image */}
      <div className="hero-image-wrap" ref={heroImgRef}>
        <img src={heroHead} alt="Lance Gabriel Masigon" />
      </div>

      {/* Socials + year — absolutely pinned bottom-right, same row */}
      <div className="hero-descriptor" ref={descriptRef}>
        <div className="hero-socials-row">
          <div className="hero-socials" aria-label="Social links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={14} />
            </a>
            <a href="mailto:hello@example.com" aria-label="Email">
              <Mail size={14} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={14} />
            </a>
          </div>
          <div className="hero-year">© 2026</div>
        </div>
      </div>

      {/* Bottom meta bar — left side */}
      <div className="hero-meta-bar" ref={metaRef}>
        <div className="hero-meta-left">
          <div className="hero-role-tag">Fullstack Developer</div>
          <p className="hero-bio-text">
            Crafting bold, memorable digital<br />experiences from Iloilo, PH.
          </p>
          <div className="hero-scroll-hint">
            <span className="scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
