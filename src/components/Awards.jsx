import { useState, useEffect } from 'react';
import aifestImg from '../assets/aifest.jpg';
import aideasImg from '../assets/aideas.jpg';
import regpscImg from '../assets/regpsc.jpg';
import koreaImg from '../assets/korea.jpg';
import westnovationImg from '../assets/westnovation.jpg';
import natpscImg from '../assets/natpsc.jpg';
import depdevImg from '../assets/Depdev.jpg';
import mysteryImg from '../assets/mystery.png';
import aifest2026Img from '../assets/aifest2026.jpg';

export default function Awards() {
  const [showAll, setShowAll] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  const achievements = [
    { title: 'Champion', organization: 'DOST: National AI Fest 2026 – AI Hackathon Open Category', year: 'AUG 2026', location: 'Philippines', details: 'Won the championship title in the Open Category at the DOST National AI Fest 2026 AI Hackathon by preseting and developing an PhantomWake: a maritime intelligence system that uses AI to predict search corridors for dark vessels and enhance maritime monitoring.', image: aifest2026Img },
    { title: 'Top 10 Finalist', organization: 'DEPDEV: 2026 National Innovation Day HABI Workshop', year: 'APR 2026', location: 'Philippines', details: 'Presented a digital framework mapping indigenous weaving patterns to contemporary graphic design tools.', image: depdevImg },
    { title: 'Semi-Finalist', organization: '1st Naga City Mayoral Hackathon - National', year: 'JAN 2026', location: 'Naga City', details: 'Engineered a civic-engagement mobile app allowing citizens to directly report infrastructural issues to local government.', image: mysteryImg },
    { title: 'Top 10 Regional Qualifier', organization: 'DOST-TAPI: KNowmad Mobile Learning Lab (Western Visayas Leg)', year: 'JAN 2026', location: 'Western Visayas', details: 'Deployed an interactive mobile learning module teaching basic programming to off-grid communities.', image: mysteryImg },
    { title: 'National Champion, Most Disruptive Idea & Best Business Model', organization: 'DICT: Philippine Startup Challenge X', year: 'DEC 2025', location: 'Clark, Pampanga', details: 'Presented the winning national startup pitch for an accessible supply-chain auditing tool powered by blockchain.', image: natpscImg },
    { title: 'Best Paper', organization: '26th International Symposium on Advanced Intelligent Systems', year: 'NOV 2025', location: 'Cheongju, South Korea', details: 'Co-authored a paper on lightweight edge-computing frameworks for autonomous agricultural drones.', image: koreaImg },
    { title: 'Champion & Most Market-Ready Innovation', organization: 'WESTnovation Challenge, West Visayas State University System', year: 'NOV 2025', location: 'La Paz, Iloilo City', details: 'Developed an IoT-based inventory management system for local SMEs with automated restocking triggers.', image: westnovationImg },
    { title: 'Champion, Best Pitch & Most Innovative', organization: 'DICT: PSC X Regional, Region VI', year: 'OCT 2025', location: 'Iloilo City', details: 'Pitched an AI-driven educational platform personalizing curriculums for neurodivergent students.', image: regpscImg },
    { title: 'Champion & Visionary Innovator', organization: 'DICT: AI.DEAS for Impact, Region VI', year: 'SEP 2025', location: 'Bacolod City', details: 'Showcased a machine learning model optimizing public transport routing based on historical traffic patterns.', image: aideasImg },
    { title: '1st Runner-Up', organization: 'DOST: National AI Fest – AI Hackathon', year: 'AUG 2025', location: 'Iloilo City', details: 'Presented a prototype integrating real-time environmental sensors with predictive AI for localized flood warnings.', image: aifestImg },
  ];

  const displayed = showAll ? achievements : achievements.slice(0, 4);

  // Re-trigger scroll animations when the list expands
  useEffect(() => {
    const revealEls = document.querySelectorAll('#awards .reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }, [showAll]);

  return (
    <section id="awards">
      <div className="eyebrow mono reveal">Awards & More</div>
      <h2 className="section-title reveal">Achievements</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', columnGap: '60px', rowGap: '10px' }}>
        {displayed.map((item, i) => (
          <div 
            className={`list-item reveal ${showAll && i >= 4 ? 'in' : ''} award-card`} 
            key={i} 
            onClick={() => setSelectedAward(item)}
            style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', padding: '12px 10px', borderRadius: '8px', transition: 'background 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-alt)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
              <span className="name" style={{ lineHeight: '1.2' }}>{item.title}</span>
              <span className="tag-year mono" style={{ marginLeft: '12px' }}>{item.year}</span>
            </div>
            <span className="sub" style={{ marginTop: '0', fontSize: '0.85rem' }}>{item.organization} • {item.location}</span>
          </div>
        ))}
      </div>
      {achievements.length > 4 && (
        <div className="reveal" style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
          <button className="btn primary" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'See less' : 'See more'}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedAward && (
        <div className="modal-backdrop" onClick={() => setSelectedAward(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAward(null)}>
              ✕
            </button>
            <div className="modal-image" style={{ backgroundImage: `url(${selectedAward.image})` }}></div>
            <h3 style={{ margin: '0 0 5px 0', color: 'var(--ink)' }}>{selectedAward.title}</h3>
            <div style={{ color: 'var(--accent-ink)', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 500 }}>
              {selectedAward.organization}
            </div>
            <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
              {selectedAward.details}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}