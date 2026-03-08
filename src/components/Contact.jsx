import { useEffect, useRef } from 'react';
import './Contact.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, svg, stagger } from 'animejs';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const rowRef     = useRef(null);
  const svgRef     = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.set(rowRef.current, { autoAlpha: 0, y: 60 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(rowRef.current, {
          autoAlpha: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          onComplete: () => {
            // Draw each letter path with red stroke
            const paths = svgRef.current.querySelectorAll('path');
            const drawables = svg.createDrawable(paths);
            animate(drawables, {
              draw: ['0 0', '0 1'],
              ease: 'outExpo',
              duration: 1400,
              delay: stagger(90),
            });
          },
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach(s => s.kill());
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-shell">

        {/* One horizontal row: solid "Let's Build" + SVG drawn "TOGETHER" inline */}
        <div className="contact-row" ref={rowRef}>
          <span className="contact-lets">Let's Build</span>

          {/* SVG drawn "TOGETHER" — red stroke, one <path> per letter */}
          <svg
            ref={svgRef}
            className="contact-svg"
            viewBox="0 0 900 140"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            stroke="var(--red)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* T — crossbar + stem */}
            <path d="M8,10 H85 M46,10 V128" />
            {/* O */}
            <path d="M100,10 H168 Q188,10 188,28 V112 Q188,130 168,130 H100 Q80,130 80,112 V28 Q80,10 100,10 Z" />
            {/* G */}
            <path d="M262,50 H232 Q205,50 205,80 Q205,130 240,130 H262 Q288,130 288,105 V78 H248" />
            {/* E */}
            <path d="M300,10 H378 M300,10 V130 M300,70 H368 M300,130 H378" />
            {/* T */}
            <path d="M393,10 H470 M431,10 V130" />
            {/* H */}
            <path d="M483,10 V130 M566,10 V130 M483,70 H566" />
            {/* E */}
            <path d="M580,10 H658 M580,10 V130 M580,70 H648 M580,130 H658" />
            {/* R */}
            <path d="M672,10 V130 M672,10 H738 Q770,10 770,48 Q770,82 738,82 H672 L755,130" />
          </svg>
        </div>

      </div>
    </section>
  );
}

