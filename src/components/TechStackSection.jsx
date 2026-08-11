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
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=100%' : '+=200%', 
          pin: !isMobile,
          scrub: 1, 
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
      // Removed the empty space at the end to prevent the "pause" feeling while scrolling
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tech" className="min-h-screen w-full pt-10 pb-10 flex flex-col items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center h-full flex flex-col">
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight leading-tight text-[#1944F1] mb-8 md:mb-2 text-center shrink-0">
          Technologies Used
        </h2>
        <div className="w-full flex-grow max-w-5xl mx-auto h-[20rem] sm:h-[22rem] md:h-[37.5rem]">
          <KeycapModel progressRef={progressRef} />
        </div>
      </div>
    </section>
  );
}
