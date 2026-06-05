import './Experience.css';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef(null);
  const bgLabelRef = useRef(null);
  const sectionNumRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Set initial states
    gsap.set([eyebrowRef.current, itemsRef.current], { autoAlpha: 0, y: 30 });
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
          .to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
          .to(itemsRef.current, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.25)
          .to(sectionNumRef.current, { autoAlpha: 1, x: 0, duration: 0.7 }, 0);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={sectionRef}>
      {/* Section number */}
      <div className="experience-section-num" ref={sectionNumRef} aria-hidden="true">
        <span className="section-index-num">03</span>
      </div>

      <div className="experience-layout">
        <div className="experience-left">
          <div className="experience-eyebrow" ref={eyebrowRef}>My Journey</div>

          <h2 className="experience-heading" ref={headingRef}>
            Experience
          </h2>

          <div className="experience-list" ref={itemsRef}>
            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Full Stack Developer</h3>
                <span className="experience-company">Knode Software Services</span>
              </div>
              <p className="experience-period">January 2026 - May 2026</p>
              <ul className="experience-description">
                <li>Developed and maintained web-based applications using modern full-stack technologies.</li>
                <li>Implemented frontend features and user interfaces using React</li>
                <li>Assisted in backend development, API integration, database operations, and system enhancements.</li>
                <li>Participated in debugging, testing, and performance optimization activities.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <h3 className="experience-title">Quality Assurance Intern</h3>
                <span className="experience-company">Knode Software Services</span>
              </div>
              <p className="experience-period">January 2026 - May 2026</p>
              <ul className="experience-description">
                <li>Developed and executed automated end-to-end test scripts using Playwright, improving testing efficiency and coverage.</li>
                <li>Documented bugs and collaborated closely with developers to verify fixes and ensure timely issue resolution.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
