import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import standingImg from '../assets/standing.png';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation: Start far right, off-screen, scale down slightly
      gsap.fromTo(
        imageRef.current,
        {
          x: '100vw',
          opacity: 0,
          scale: 0.8,
        },
        {
          x: '0%',
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: false,
          },
        }
      );

      // Text scrub animation
      const words = textRef.current.querySelectorAll('.reveal-word');
      gsap.to(words, {
        color: '#1944F1',
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          end: 'bottom 40%',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText = "Hello! I'm Lance Gabriel Masigon, a Fullstack Developer with a deep interest in UI/UX design. I enjoy building simple, clean, and user-friendly websites while continuously learning new technologies.";
  const wordsArray = aboutText.split(" ");

  return (
    <section ref={sectionRef} id="about" className="min-h-screen w-full py-16 md:py-24 relative overflow-hidden flex items-center">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center h-full gap-8 md:gap-16">
          
          {/* Left Side: Text */}
          <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
            <h3 className="text-lg md:text-2xl xl:text-3xl font-semibold text-[#1944F1] mb-4 uppercase tracking-widest">
              Who is Lance?
            </h3>
            <p ref={textRef} className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-tight text-gray-300">
              {wordsArray.map((word, i) => {
                if (word === "Fullstack") {
                  return (
                    <span key={i} className="relative inline-block mr-[0.2em] pb-2">
                       <span className="relative z-10 whitespace-nowrap">
                         <span className="reveal-word inline-block mr-[0.2em]">Fullstack</span>
                         <span className="reveal-word inline-block">Developer</span>
                       </span>
                       <svg className="absolute w-[115%] h-[130%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 text-red-500 pointer-events-none" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                          <path d="M10,30 C30,10 170,10 190,30 C205,45 170,55 100,55 C30,55 5,40 10,30 Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-90"/>
                          <path d="M20,28 C50,15 150,15 180,28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                       </svg>
                    </span>
                  );
                }
                if (word === "Developer") return null;

                return (
                  <span 
                    key={i} 
                    className="reveal-word inline-block mr-[0.2em] pb-2"
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
          
          {/* Right Side: Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-center relative h-[60vh] md:h-[95vh]">
            <img 
              ref={imageRef}
              src={standingImg} 
              alt="Avatar standing" 
              className="h-full w-auto object-contain drop-shadow-2xl scale-110 md:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

