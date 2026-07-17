import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import beanbagImg from '../assets/beanbag.png';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const characterRef = useRef(null);
  const headlineRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef(null);
  const chipsRef = useRef([]);
  const glowRef = useRef(null);

  const chips = [
    { name: 'React', icon: '/icons/react.svg', position: { top: '10%', right: '10%' }, delay: 0 },
    { name: 'GSAP', icon: null, position: { top: '40%', right: '85%' }, delay: 0.1 },
    { name: 'Flutter', icon: null, position: { top: '60%', right: '15%' }, delay: 0.2 },
    { name: 'Node.js', icon: '/icons/nodejs.svg', position: { top: '5%', right: '80%' }, delay: 0.3 },
    { name: 'Supabase', icon: '/icons/supabase.svg', position: { top: '60%', right: '70%' }, delay: 0.4 },
    { name: 'Python', icon: '/icons/python.svg', position: { top: '50%', right: '60%' }, delay: 0.5 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Words in headline
      const words = headlineRef.current.querySelectorAll('.word');
      
      gsap.set(words, { opacity: 0, y: 20 });
      gsap.set(paragraphRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
      gsap.set(characterRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(chipsRef.current, { opacity: 0, scale: 0.8 });

      // Entrance Animations
      tl.to(characterRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.4)
      .to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.8)
      .to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, 1.2)
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, 1.5)
      .to(chipsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.5)',
      }, 2.0);

      // Idle Animations
      gsap.to(characterRef.current, {
        y: '-=16', // ±8px
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 1.2
      });

      chipsRef.current.forEach((chip, i) => {
        gsap.to(chip, {
          y: '-=10',
          x: '+=5',
          duration: 3 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: 2.6 + i * 0.1
        });
      });

      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      // Mouse Parallax
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5);
        const yPos = (clientY / window.innerHeight - 0.5);

        gsap.to(characterRef.current, {
          rotationY: xPos * 6, // 3 degrees each way
          rotationX: -yPos * 4,
          duration: 0.5,
          ease: 'power2.out'
        });

        gsap.to(glowRef.current, {
          x: xPos * -40,
          y: yPos * -40,
          duration: 0.8,
          ease: 'power2.out'
        });

        chipsRef.current.forEach((chip, i) => {
          const depth = 1 + (i % 3) * 0.5;
          gsap.to(chip, {
            x: xPos * -30 * depth,
            y: yPos * -30 * depth,
            duration: 0.6,
            ease: 'power2.out'
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="min-h-screen w-full flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between relative z-10 pt-20">
        
        {/* Left Side: Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center items-start pt-10 md:pt-0 pb-10 z-20">
          <h1 
            ref={headlineRef}
            className="flex flex-col text-6xl sm:text-7xl md:text-[8rem] lg:text-[8rem] font-black text-[#1944F1] leading-[0.85] mb-6 tracking-[-0.05em]"
          >
            {'WEBSITE PORTFOLIO'.split(' ').map((word, i) => (
              <span key={i} className="block word drop-shadow-sm">
                {word}
              </span>
            ))}
          </h1>
          
          <div ref={buttonsRef} className="flex flex-col items-start gap-8 mt-4">
            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="https://github.com/lansmasigon" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-[#000298] transition-colors p-3 hover:bg-blue-50 rounded-full border-2 border-gray-200 hover:border-[#000298]"
              >
                <Github size={32} />
              </a>
              <a 
                href="https://linkedin.com/in/lancegabrielmasigon" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-[#000298] transition-colors p-3 hover:bg-blue-50 rounded-full border-2 border-gray-200 hover:border-[#000298]"
              >
                <Linkedin size={32} />
              </a>
              <a 
                href="mailto:lancemasigon@gmail.com" 
                className="text-gray-800 hover:text-[#000298] transition-colors p-3 hover:bg-blue-50 rounded-full border-2 border-gray-200 hover:border-[#000298]"
              >
                <Mail size={32} />
              </a>
            </div>
            
            <div className="flex items-center gap-3 text-gray-500 animate-bounce mt-4 absolute bottom-8 md:relative md:bottom-auto">
              <span className="text-sm font-medium uppercase tracking-wider">Scroll to explore</span>
              <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center pt-1">
                <div className="w-1 h-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Character & Scene */}
        <div className="w-full md:w-[45%] h-[50vh] md:h-screen relative flex items-end justify-center pointer-events-none md:-mb-20 perspective-1000 mt-8 md:mt-0">
          
          {/* Radial Glow */}
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square max-w-[600px]"
            style={{
              background: 'radial-gradient(circle, rgba(165,215,252,.25), transparent 70%)',
              borderRadius: '50%'
            }}
          />

          {/* Character Image */}
          <div 
            ref={characterRef} 
            className="relative z-10 w-full max-w-[500px] transform-style-3d -translate-y-20 md:-translate-y-21"
          >
            <img 
              src={beanbagImg} 
              alt="Lance sitting on a beanbag" 
              className="w-full h-auto drop-shadow-2xl object-contain object-bottom"
            />
          </div>

          {/* Floating Tech Chips */}
          <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
            {chips.map((chip, index) => (
              <div
                key={chip.name}
                ref={el => chipsRef.current[index] = el}
                className="absolute bg-white/90 backdrop-blur-sm border border-gray-100 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                style={{
                  top: chip.position.top,
                  left: chip.position.right, // using right as left for absolute positioning relative to parent
                }}
              >
                {chip.icon && (
                  <img src={chip.icon} alt={chip.name} className="w-4 h-4 object-contain" />
                )}
                <span className="text-sm font-medium text-gray-700">{chip.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
