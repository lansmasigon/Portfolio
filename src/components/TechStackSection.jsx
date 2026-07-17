import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import KeycapModel from './KeycapModel';

gsap.registerPlugin(ScrollTrigger);

export default function TechStackSection() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%', // Increased scroll duration
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });
      
      const proxy = { p: 0 };
      tl.to(proxy, {
        p: 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => {
          progressRef.current = proxy.p;
        }
      })
      // Add empty space at the end of the timeline to create a pause after animation finishes
      .to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tech" className="min-h-screen w-full pt-10 pb-10 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center h-full flex flex-col">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-[#1944F1] mb-2 text-center shrink-0">
          Technologies Used
        </h2>
        <div className="w-full flex-grow max-w-5xl mx-auto h-[400px] md:h-[600px]">
          <KeycapModel progressRef={progressRef} />
        </div>
      </div>
    </section>
  );
}
