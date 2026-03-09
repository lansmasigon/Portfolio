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
          duration: 1.2,
          ease: 'power3.out',
          onComplete: () => {
            // Select one <g> per letter, animate them one after another
            const groups = svgRef.current?.querySelectorAll('g[data-letter]');
            if (!groups?.length) return;
            groups.forEach((g, i) => {
              const paths = g.querySelectorAll('path');
              const drawables = svg.createDrawable(paths);
              animate(drawables, {
                draw: ['0 0', '0 1'],
                ease: 'outExpo',
                duration: 700,
                delay: i * 180,
              });
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
        <div className="contact-row" ref={rowRef}>
          <span className="contact-lets">Let's Build</span>

          {/*
            SVG "TOGETHER" — thick outlined paths per letter.
            The CSS 3D extrude is done via stacked drop-shadow filters on the SVG.
            Stroke is drawn by anime.js createDrawable.
          */}
          <svg
            ref={svgRef}
            className="contact-svg"
            viewBox="0 0 980 150"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Together"
            fill="none"
            stroke="var(--red)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* T — crossbar then stem as separate paths so both draw for this letter */}
            <g data-letter="T">
              <path d="M6,12 H86" />
              <path d="M46,12 V138" />
            </g>
            {/* O — single closed rect with rounded corners */}
            <g data-letter="O">
              <path d="M102,12 C102,12 96,12 96,30 L96,120 C96,138 102,138 118,138 L158,138 C174,138 180,132 180,120 L180,30 C180,12 174,12 158,12 Z" />
            </g>
            {/* G */}
            <g data-letter="G">
              <path d="M270,55 L240,55 C210,55 205,75 205,90 C205,125 220,138 252,138 L272,138 C296,138 300,118 300,105 L300,80 L258,80" />
            </g>
            {/* E — top bar, spine, mid bar, bottom bar */}
            <g data-letter="E">
              <path d="M315,12 L395,12" />
              <path d="M315,12 L315,138" />
              <path d="M315,72 L385,72" />
              <path d="M315,138 L395,138" />
            </g>
            {/* T */}
            <g data-letter="T2">
              <path d="M410,12 H490" />
              <path d="M450,12 V138" />
            </g>
            {/* H — left stem, crossbar, right stem */}
            <g data-letter="H">
              <path d="M505,12 L505,138" />
              <path d="M505,75 L585,75" />
              <path d="M585,12 L585,138" />
            </g>
            {/* E */}
            <g data-letter="E2">
              <path d="M600,12 L680,12" />
              <path d="M600,12 L600,138" />
              <path d="M600,72 L670,72" />
              <path d="M600,138 L680,138" />
            </g>
            {/* R — stem, top arch, leg */}
            <g data-letter="R">
              <path d="M695,12 L695,138" />
              <path d="M695,12 L758,12 C782,12 790,28 790,50 C790,72 782,86 758,86 L695,86" />
              <path d="M730,86 L790,138" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

