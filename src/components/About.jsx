import { useEffect, useRef } from 'react';
import './About.css';
import abouticon from '../assets/abouticon.png';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-layout">
        <div className="about-left">
          <h2 className="about-title">ABOUT ME</h2>
          <p className="about-paragraph">
            Hello! I'm Lance Gabriel Masigon, a Fullstack Developer with an interest in UI/UX design. I
            enjoy building simple, clean, and user-friendly websites while continuously learning new
            technologies. I'm passionate about improving my skills and creating simple yet meaningful
            digital experiences.
          </p>
          <a className="about-contact" href="#home">
            CONTACT ME
          </a>
        </div>

        <div className="about-right">
          <img src={abouticon} alt="Tech keycaps" className="about-icon-img" />
        </div>
      </div>
    </section>
  );
}
