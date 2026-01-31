import { useState, useEffect, useRef } from 'react';
import './Awards.css';
import aideas from '../assets/aideas.jpg';
import westnovation from '../assets/westnovation.jpg';
import aifest from '../assets/aifest.jpg';
import natpsc from '../assets/natpsc.jpg';
import regpsc from '../assets/regpsc.jpg';
import korea from '../assets/korea.jpg';
import CardSwap, { Card } from './CardSwap';


function Awards() {
  const [selectedAward, setSelectedAward] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe section title
    const titleElement = sectionRef.current?.querySelector('.section-title');
    if (titleElement) observer.observe(titleElement);

    // Observe all award cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const awards = [
    {
      id: 1,
      number: "01",
      title: "National Champion, Most Disruptive Idea, & Best Business Model",
      organization: "DICT: Philippine Startup Challenge X",
      year: "DEC 2025",
      location: "Clark Pampanga",
      image: natpsc,
      details: "Awarded National Champion, Most Disruptive Idea, and Best Business Model at the Philippine Startup Challenge X held in Clark, Pampanga.",
      link: "#"
    },
    {
      id: 2,
      number: "02",
      title: "Best Paper",
      organization: "26th International Symposium on Advanced Intelligent Systems",
      year: "NOV 2025",
      location: "Cheongju South Korea",
      image: korea,
      details: "Presented research paper at the 26th International Symposium on Advanced Intelligent Systems in Cheongju, South Korea.",
      link: "#"
    },
    {
      id: 3,
      number: "03",
      title: "Champion & Most Market-Ready Innovation",
      organization: "WESTnovation Challenge, West Visayas State University System",
      year: "NOV 2025",
      location: "La Paz, Iloilo City",
      image: westnovation,
      details: "Won Champion and Most Market-Ready Innovation at the WESTnovation Challenge.",
      link: "#"
    },
    {
      id: 4,
      number: "04",
      title: "Champion, Best Pitch, & Most Innovative",
      organization: "DICT: PSC X Regional, Region VI",
      year: "OCT 2025",
      location: "Iloilo City",
      image: regpsc,
      details: "Philippine Startup Challenge X Regional competition.",
      link: "#"
    },
    {
      id: 5,
      number: "05",
      title: "Champion & Visionary Innovator",
      organization: "DICT: AI.DEAS for Impact, Region VI",
      year: "SEP 2025",
      location: "Bacolod City",
      image: aideas,
      details: "Champion and Visionary Innovator at AI.DEAS for Impact competition in Bacolod City.",
      link: "#"
    },
    {
      id: 6,
      number: "06",
      title: "1st Runner-Up",
      organization: "DOST: National AI Fest – AI Hackathon",
      year: "AUG 2025",
      location: "Iloilo City",
      image: aifest,
      details: "Secured 1st Runner-Up position at the National AI Fest AI Hackathon organized by DOST.",
      link: "#"
    }
  ];

  const openModal = (award) => {
    setSelectedAward(award);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="awards" className="awards-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title scroll-animate">Awards & Recognition</h2>
        
        <div className="awards-layout">
          {/* Left side - Description that changes with card */}
          <div className="award-description-side">
            <p className="award-organization-large">{awards[currentIndex].organization}</p>
            <h3 className="award-title-large">{awards[currentIndex].title}</h3>
            <div className="award-meta">
              <span className="award-year-badge">{awards[currentIndex].year}</span>
              <span className="award-location-text">📍 {awards[currentIndex].location}</span>
            </div>
            <p className="award-details-text">{awards[currentIndex].details}</p>
          </div>

          {/* Right side - CardSwap with only images */}
          <div className="award-card-side">
            <CardSwap
              cardDistance={50}
              verticalDistance={70}
              delay={4500}
              pauseOnHover={true}
              onIndexChange={setCurrentIndex}
            >
              {awards.map((award) => (
                <Card key={award.id}>
                  <div className="award-card-image-only">
                    <img src={award.image} alt={award.title} className="award-image" />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>

      {selectedAward && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedAward.image} alt={selectedAward.title} />
            </div>
            <div className="modal-body">
              <div className="modal-year">{selectedAward.year}</div>
              <h2 className="modal-title">{selectedAward.title}</h2>
              <p className="modal-organization">{selectedAward.organization}</p>
              <p className="modal-location">{selectedAward.location}</p>
              <div className="modal-details">
                <h4>About this Achievement</h4>
                <p>{selectedAward.details}</p>
              </div>
              {selectedAward.link && selectedAward.link !== "#" && (
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

export default Awards;
