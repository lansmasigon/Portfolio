import { useEffect, useRef } from 'react';
import './About.css';
import Lanyard from './Lanyard';
import StackIcon from 'tech-stack-icons';

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
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">About Me</h2>
        </div>
        
        <div className="about-content">
          <div className="about-text">
           <p className="about-paragraph">
            Hello! I'm Lance Gabriel Masigon, a Fullstack Developer with an interest in UI/UX design. 
            I enjoy building simple, clean, and user-friendly websites while continuously learning 
            new technologies. I'm passionate about improving my skills and creating simple yet meaningful digital experiences.
            </p>
            
            <div className="tech-icons-section">
              <h3 className="tech-icons-title">Technologies I Use:</h3>
              <div className="tech-icons-grid">
                <span className="tech-icon-item" title="Python">
                  <StackIcon name="python" />
                </span>
                <span className="tech-icon-item" title="JavaScript">
                  <StackIcon name="js" />
                </span>
                <span className="tech-icon-item" title="React.js">
                  <StackIcon name="react" />
                </span>
                <span className="tech-icon-item" title="Vite">
                  <StackIcon name="vitejs" />
                </span>
                <span className="tech-icon-item" title="HTML5">
                  <StackIcon name="html5" />
                </span>
                <span className="tech-icon-item" title="CSS3">
                  <StackIcon name="css3" />
                </span>
                <span className="tech-icon-item" title="Flutter">
                  <StackIcon name="flutter" />
                </span>
                <span className="tech-icon-item" title="Supabase">
                  <StackIcon name="supabase" />
                </span>
              </div>
            </div>
          </div>
          
          <div className="about-lanyard">
            <Lanyard />
          </div>
        </div>
      </div>
    </section>
  );
}
