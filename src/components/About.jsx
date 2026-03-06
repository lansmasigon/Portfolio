import './About.css';
import KeycapModel from './KeycapModel';
import { useRef, useEffect } from 'react';
import { useScrollReveal } from '../lib/useScrollReveal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAME = 'Lance Gabriel Masigon';

export default function About() {
  const nameRef = useRef(null);

  const sectionRef = useScrollReveal((tl, el) => {
    tl.from(el.querySelector('.about-title'),       { y: 30, autoAlpha: 0, duration: 0.6,  ease: 'power3.out' })
      .from(el.querySelector('.about-paragraph'),   { y: 20, autoAlpha: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3')
      .from(el.querySelector('.about-contact'),     { y: 16, autoAlpha: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3')
      .from(el.querySelector('.about-canvas-wrap'), { x: 50, autoAlpha: 0, duration: 0.7,  ease: 'power3.out' }, '-=0.5');
  });

  // Name letter-by-letter animation on scroll
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const letters = el.querySelectorAll('.name-char');

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(letters,
          { autoAlpha: 0, y: 12, rotateX: -60 },
          {
            autoAlpha: 1, y: 0, rotateX: 0,
            duration: 0.045,
            stagger: 0.045,
            ease: 'power2.out',
          }
        );
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-layout">
        <div className="about-left">
          <h2 className="about-title">ABOUT ME</h2>
          <p className="about-paragraph">
            Hello! I'm{' '}
            <span className="about-name" ref={nameRef}>
              {NAME.split('').map((char, i) => (
                <span
                  key={i}
                  className="name-char"
                  style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            , a Fullstack Developer with an interest in UI/UX design. I
            enjoy building simple, clean, and user-friendly websites while continuously learning new
            technologies. I'm passionate about improving my skills and creating simple yet meaningful
            digital experiences.
          </p>
          <a className="about-contact" href="#home">
            CONTACT ME
          </a>
        </div>

        <div className="about-right">
          <div className="about-canvas-wrap">
            <KeycapModel />
          </div>
        </div>
      </div>
    </section>
  );
}
