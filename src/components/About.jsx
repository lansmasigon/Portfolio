import './About.css';
import KeycapModel from './KeycapModel';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef  = useRef(null);
  const eyebrowRef  = useRef(null);
  const headingRef  = useRef(null);
  const bodyRef     = useRef(null);
  const statsRef    = useRef(null);
  const rightRef    = useRef(null);
  const bgLabelRef  = useRef(null);
  const sectionNumRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Set initial states
    gsap.set([eyebrowRef.current, bodyRef.current],
      { autoAlpha: 0, y: 30 });
    gsap.set(rightRef.current, { autoAlpha: 0, x: 60 });
    gsap.set(bgLabelRef.current, { autoAlpha: 0 });
    gsap.set(sectionNumRef.current, { autoAlpha: 0, x: -20 });

    // Heading chars split
    const heading = headingRef.current;
    const words = heading.innerText.split(' ');
    heading.innerHTML = words.map(w =>
      `<span class="h-word" style="overflow:hidden;display:inline-block;margin-right:0.25em">
        <span class="h-inner" style="display:block;transform:translateY(110%)">${w}</span>
      </span>`
    ).join('');

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(el.querySelectorAll('.h-inner'), {
            y: '0%', stagger: 0.07, duration: 0.75,
          })
          .to(eyebrowRef.current,   { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
          .to(bodyRef.current,      { autoAlpha: 1, y: 0, duration: 0.6  }, 0.25)
          .to(rightRef.current,     { autoAlpha: 1, x: 0, duration: 0.8  }, 0.15)
          .to(bgLabelRef.current,   { autoAlpha: 1, duration: 1.2        }, 0)
          .to(sectionNumRef.current,{ autoAlpha: 1, x: 0, duration: 0.7  }, 0);

        // Stat rollers — awards first, then projects
        const rollers = statsRef.current?.querySelectorAll('.stat-roller');
        if (rollers?.length) {
          rollers.forEach((roller, idx) => {
            const target  = parseInt(roller.dataset.target, 10);
            const track   = roller.querySelector('.stat-roller-track');
            const digits  = roller.querySelectorAll('.stat-roller-digit');
            const digitH  = digits[0]?.offsetHeight || 48;
            // Start at top (digit 0 visible)
            gsap.set(track, { y: 0 });
            // Stagger: awards at 400ms, projects at 400 + 900ms
            const delay = 0.4 + idx * 0.9;
            gsap.to(track, {
              y: -(target * digitH),
              duration: 1.6,
              ease: 'power4.out',
              delay,
            });
          });
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {/* Background ghost text */}
      <div className="about-bg-label" ref={bgLabelRef} aria-hidden="true">ABOUT</div>

      {/* Section number */}
      <div className="about-section-num" ref={sectionNumRef} aria-hidden="true">
        <span className="section-index-num">02</span>
      </div>

      <div className="about-layout">
        {/* Left: text */}
        <div className="about-left">
          <div className="about-eyebrow" ref={eyebrowRef}>Who I am</div>

          <h2 className="about-heading" ref={headingRef}>
            Full<em>stack</em> Developer
          </h2>

          <p className="about-body" ref={bodyRef}>
            Hello! I'm <strong>Lance Gabriel Masigon</strong>, a Fullstack Developer with a deep interest
            in UI/UX design. I enjoy building <strong>simple, clean, and user-friendly</strong> websites
            while continuously learning new technologies. I'm passionate about crafting
            simple yet meaningful digital experiences that leave a lasting impression.
          </p>

          <div className="about-stats" ref={statsRef}>
            <div className="about-stat">
              <div className="stat-roller" data-target="6" data-suffix="+">
                <div className="stat-roller-track">
                  {[0,1,2,3,4,5,6].map(n => (
                    <span key={n} className="stat-roller-digit">{n}+</span>
                  ))}
                </div>
              </div>
              <span className="stat-label">Awards Won</span>
            </div>
            <div className="about-stat">
              <div className="stat-roller" data-target="6" data-suffix="+">
                <div className="stat-roller-track">
                  {[0,1,2,3,4,5,6].map(n => (
                    <span key={n} className="stat-roller-digit">{n}+</span>
                  ))}
                </div>
              </div>
              <span className="stat-label">Projects Built</span>
            </div>
          </div>
        </div>

        {/* Right: 3D keycap model — no border container, just canvas */}
        <div className="about-right" ref={rightRef}>
          <div className="about-canvas-wrap">
            <KeycapModel />
          </div>
        </div>
      </div>
    </section>
  );
}
