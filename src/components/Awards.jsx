import { useState, useEffect, useRef } from 'react';
import './Awards.css';
import aideas from '../assets/aideas.jpg';
import westnovation from '../assets/westnovation.jpg';
import aifest from '../assets/aifest.jpg';
import natpsc from '../assets/natpsc.jpg';
import regpsc from '../assets/regpsc.jpg';
import korea from '../assets/korea.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AWARDS = [
  {
    id: 1,
    number: '01',
    title: 'National Champion, Most Disruptive Idea & Best Business Model',
    organization: 'DICT: Philippine Startup Challenge X',
    year: 'DEC 2025',
    location: 'Clark, Pampanga',
    image: natpsc,
    details: 'Awarded National Champion, Most Disruptive Idea, and Best Business Model at the Philippine Startup Challenge X held in Clark, Pampanga.',
    link: '#'
  },
  {
    id: 2,
    number: '02',
    title: 'Best Paper',
    organization: '26th International Symposium on Advanced Intelligent Systems',
    year: 'NOV 2025',
    location: 'Cheongju, South Korea',
    image: korea,
    details: 'Presented research paper at the 26th International Symposium on Advanced Intelligent Systems in Cheongju, South Korea.',
    link: '#'
  },
  {
    id: 3,
    number: '03',
    title: 'Champion & Most Market-Ready Innovation',
    organization: 'WESTnovation Challenge, West Visayas State University System',
    year: 'NOV 2025',
    location: 'La Paz, Iloilo City',
    image: westnovation,
    details: 'Won Champion and Most Market-Ready Innovation at the WESTnovation Challenge.',
    link: '#'
  },
  {
    id: 4,
    number: '04',
    title: 'Champion, Best Pitch & Most Innovative',
    organization: 'DICT: PSC X Regional, Region VI',
    year: 'OCT 2025',
    location: 'Iloilo City',
    image: regpsc,
    details: 'Philippine Startup Challenge X Regional competition winner.',
    link: '#'
  },
  {
    id: 5,
    number: '05',
    title: 'Champion & Visionary Innovator',
    organization: 'DICT: AI.DEAS for Impact, Region VI',
    year: 'SEP 2025',
    location: 'Bacolod City',
    image: aideas,
    details: 'Champion and Visionary Innovator at AI.DEAS for Impact competition in Bacolod City.',
    link: '#'
  },
  {
    id: 6,
    number: '06',
    title: '1st Runner-Up',
    organization: 'DOST: National AI Fest – AI Hackathon',
    year: 'AUG 2025',
    location: 'Iloilo City',
    image: aifest,
    details: 'Secured 1st Runner-Up position at the National AI Fest AI Hackathon organized by DOST.',
    link: '#'
  }
];

export default function Awards() {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);
  const sectionRef = useRef(null);
  const bgImgRef   = useRef(null);
  const modalRef   = useRef(null);
  const rowRefs    = useRef([]);

  // Scroll-triggered row entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.set(row, { autoAlpha: 0, y: 30 });
      ScrollTrigger.create({
        trigger: row,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(row, {
            autoAlpha: 1, y: 0,
            duration: 0.65,
            ease: 'power3.out',
            delay: i * 0.07,
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(s => s.kill());
  }, []);

  // Background image crossfade on hover
  useEffect(() => {
    const img = bgImgRef.current;
    if (!img) return;
    const award = AWARDS.find(a => a.id === hoveredId);
    if (!award) {
      gsap.to(img, { autoAlpha: 0, duration: 0.35, ease: 'power2.in' });
    } else {
      img.src = award.image;
      gsap.fromTo(img,
        { autoAlpha: 0, scale: 1.04 },
        { autoAlpha: 0.18, scale: 1, duration: 0.55, ease: 'power2.out' }
      );
    }
  }, [hoveredId]);

  const openModal = (award) => {
    setSelectedAward(award);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { autoAlpha: 0, y: 40, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    });
  };

  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        autoAlpha: 0, y: 30, scale: 0.97, duration: 0.3, ease: 'power2.in',
        onComplete: () => { setSelectedAward(null); document.body.style.overflow = 'auto'; },
      });
    } else {
      setSelectedAward(null);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <section id="awards" className="awards-section" ref={sectionRef}>

      {/* Ambient background image on hover */}
      <img ref={bgImgRef} className="awards-bg-img" src="" alt="" aria-hidden="true" />

      {/* Section header */}
      <div className="awards-header">
        <h2 className="awards-title">Awards and<br /><em>Recognition</em></h2>

        {/* Section number */}
        <div className="awards-section-num" aria-hidden="true">
          <span className="section-index-num">04</span>
          <span className="section-index-label">AWARDS</span>
        </div>
      </div>

      {/* Award rows list */}
      <div className="awards-list">
        {AWARDS.map((award, i) => (
          <div
            key={award.id}
            ref={el => rowRefs.current[i] = el}
            className={`award-row ${hoveredId === award.id ? 'is-hovered' : ''} ${hoveredId && hoveredId !== award.id ? 'is-dimmed' : ''}`}
            onMouseEnter={() => setHoveredId(award.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => openModal(award)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && openModal(award)}
          >
            <span className="award-row-num">{award.number}</span>
            <div className="award-row-main">
              <h3 className="award-row-title">{award.title}</h3>
              <p className="award-row-org">{award.organization}</p>
            </div>
            <div className="award-row-meta">
              <span className="award-row-year">{award.year}</span>
              <span className="award-row-loc">{award.location}</span>
            </div>
            <div className="award-row-arrow" aria-hidden="true">→</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAward && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" ref={modalRef} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedAward.image} alt={selectedAward.title} />
            </div>
            <div className="modal-body">
              <div className="modal-year">{selectedAward.year}</div>
              <h2 className="modal-title">{selectedAward.title}</h2>
              <p className="modal-organization">{selectedAward.organization}</p>
              <p className="modal-location">📍 {selectedAward.location}</p>
              <div className="modal-details">
                <h4>About this Achievement</h4>
                <p>{selectedAward.details}</p>
              </div>
              {selectedAward.link && selectedAward.link !== '#' && (
                <a href={selectedAward.link} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Learn More →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
