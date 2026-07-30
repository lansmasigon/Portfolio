import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import aideas from '../assets/aideas.jpg';
import westnovation from '../assets/westnovation.jpg';
import aifest from '../assets/aifest.jpg';
import natpsc from '../assets/natpsc.jpg';
import regpsc from '../assets/regpsc.jpg';
import korea from '../assets/korea.jpg';
import depdev from '../assets/Depdev.jpg';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    id: 1,
    number: '01',
    title: '1st Runner-Up',
    organization: 'DOST: National AI Fest – AI Hackathon',
    year: 'AUG 2025',
    location: 'Iloilo City',
    image: aifest,
    details: 'Secured 1st Runner-Up position at the National AI Fest AI Hackathon organized by DOST.',
    link: '#'
  },
  {
    id: 2,
    number: '02',
    title: 'Champion & Visionary Innovator',
    organization: 'DICT: AI.DEAS for Impact, Region VI',
    year: 'SEP 2025',
    location: 'Bacolod City',
    image: aideas,
    details: 'Champion and Visionary Innovator at AI.DEAS for Impact competition in Bacolod City.',
    link: '#'
  },
  {
    id: 3,
    number: '03',
    title: 'Champion, Best Pitch & Most Innovative',
    organization: 'DICT: PSC X Regional, Region VI',
    year: 'OCT 2025',
    location: 'Iloilo City',
    image: regpsc,
    details: 'Philippine Startup Challenge X Regional competition winner.',
    link: '#'
  },
  {
    id: 4,
    number: '04',
    title: 'Best Paper',
    organization: '26th International Symposium on Advanced Intelligent Systems',
    year: 'NOV 2025',
    location: 'Cheongju, South Korea',
    image: korea,
    details: 'Presented research paper at the 26th International Symposium on Advanced Intelligent Systems in Cheongju, South Korea.',
    link: '#'
  },
  {
    id: 5,
    number: '05',
    title: 'Champion & Most Market-Ready Innovation',
    organization: 'WESTnovation Challenge, West Visayas State University System',
    year: 'NOV 2025',
    location: 'La Paz, Iloilo City',
    image: westnovation,
    details: 'Won Champion and Most Market-Ready Innovation at the WESTnovation Challenge.',
    link: '#'
  },
  {
    id: 6,
    number: '06',
    title: 'National Champion, Most Disruptive Idea & Best Business Model',
    organization: 'DICT: Philippine Startup Challenge X',
    year: 'DEC 2025',
    location: 'Clark, Pampanga',
    image: natpsc,
    details: 'Awarded National Champion, Most Disruptive Idea, and Best Business Model at the Philippine Startup Challenge X held in Clark, Pampanga.',
    link: '#'
  },
   {
    id: 7,
    number: '09',
    title: '📈 Top 10 Regional Qualifier',
    organization: 'DOST-TAPI: KNowmad Mobile Learning Lab (Western Visayas Leg)',
    year: '2026',
    location: 'Western Visayas',
    image: null,
    details: 'Top 10 Regional Qualifier at DOST-TAPI: KNowmad Mobile Learning Lab (Western Visayas Leg).',
    link: '#'
  },
  {
    id: 8,
    number: '07',
    title: '🏅 Semi-Finalist',
    organization: '1st Naga City Mayoral Hackathon - National',
    year: 'JAN 2026',
    location: 'Naga City',
    image: null,
    details: 'Semi-Finalist at the 1st Naga City Mayoral Hackathon - National held on January 11, 2026.',
    link: '#'
  },
  {
    id: 9,
    number: '08',
    title: '📋 Top 10 Finalist',
    organization: 'DEPDEV: 2026 National Innovation Day HABI Workshop',
    year: 'APR 2026',
    location: 'Philippines',
    image: depdev,
    details: 'Top 10 Finalist at DEPDEV: 2026 National Innovation Day HABI Workshop held on April 27-29, 2026.',
    link: '#'
  }
];

export default function AwardsSection() {
  const [activeAward, setActiveAward] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Set initial positions for the fanned out state
      const totalCards = cardsRef.current.length;
      
      // We'll animate FROM fully compressed in the center TO the fanned out state
      gsap.fromTo(cardsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.8,
      }, {
        x: (i) => {
          const centerIndex = Math.floor(totalCards / 2);
          const offset = i - centerIndex;
          // Use a smaller spacing factor to keep them on screen
          const spacing = Math.min(window.innerWidth / (totalCards + 4), 100);
          return offset * spacing; 
        },
        y: (i) => {
          const centerIndex = Math.floor(totalCards / 2);
          const offset = Math.abs(i - centerIndex);
          return offset * 12; // slightly more arc
        },
        rotation: (i) => {
          const centerIndex = Math.floor(totalCards / 2);
          const offset = i - centerIndex;
          return offset * 4; // slightly more tilt
        },
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="awards" ref={containerRef} className="min-h-screen w-full py-16 md:py-24 overflow-hidden bg-transparent flex flex-col justify-center">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl flex-grow flex flex-col">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-black mb-4">
            Awards & Recognition
          </h2>
          <p className="text-black/70 max-w-2xl mx-auto">
            A track record of excellence in innovation, technology, and problem-solving across national and international stages.
          </p>
        </div>
        
        {/* Mobile: Grid, Desktop: Absolute centered for fanning out */}
        <div className="grid grid-cols-1 gap-8 md:flex md:justify-center md:items-start md:relative md:h-[380px] md:w-full">
          {AWARDS.map((award, index) => (
            <div 
              key={award.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="award-card md:absolute md:w-[240px] md:h-[360px] group hover:!z-[60]"
              style={{ zIndex: index }}
            >
              <div
                className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden hover:border-blue transition-all duration-300 cursor-pointer flex flex-col h-full md:shadow-xl md:group-hover:-translate-y-12 md:group-hover:scale-110 md:group-hover:shadow-2xl md:origin-bottom"
                onClick={() => setActiveAward(award)}
              >
                {award.image ? (
                  <div className="h-48 w-full overflow-hidden bg-gray-100">
                    <img 
                      src={award.image} 
                      alt={award.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gray-50 flex items-center justify-center border-b border-gray-200">
                    <span className="text-4xl">🏆</span>
                  </div>
                )}
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-blue bg-blue/10 px-2 py-1 rounded">
                      {award.year}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {award.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow font-medium line-clamp-2">
                    {award.organization}
                  </p>
                  <div className="mt-auto">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue text-white text-sm font-medium hover:bg-blue/90 transition-colors">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeAward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setActiveAward(null)}>
          <div 
            className={`bg-white border border-gray-200 rounded-2xl w-full max-h-[90vh] flex flex-col shadow-2xl text-black relative ${activeAward.image ? 'max-w-5xl' : 'max-w-2xl'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveAward(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/70 backdrop-blur-md hover:bg-gray-100 rounded-full transition-colors text-gray-800 flex-shrink-0 border border-gray-200/50 shadow-sm"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className={`overflow-y-auto flex-1 w-full rounded-2xl ${activeAward.image ? 'grid grid-cols-1 md:grid-cols-2' : ''}`}>
              {/* Left Side: Details */}
              <div className="p-6 md:p-10 flex flex-col justify-center h-full order-last md:order-first">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue/10 text-blue text-sm font-medium mb-4">
                    {activeAward.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 pr-8">
                    {activeAward.title}
                  </h3>
                  <p className="text-lg text-gray-700">
                    {activeAward.organization}
                  </p>
                </div>

                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Location</h4>
                    <p className="text-gray-700">{activeAward.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Details</h4>
                    <p className="text-gray-700 leading-relaxed">{activeAward.details}</p>
                  </div>
                  
                  {activeAward.link && activeAward.link !== '#' && (
                    <div className="pt-2">
                      <a 
                        href={activeAward.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue text-white font-medium hover:bg-blue/90 transition-colors"
                      >
                        Learn More
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Image */}
              {activeAward.image && (
                <div className="w-full h-64 md:h-auto min-h-[250px] order-first md:order-last bg-gray-100">
                  <img src={activeAward.image} alt={activeAward.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
