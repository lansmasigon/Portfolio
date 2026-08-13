import beanbag from '../assets/beanbag.png';

export default function About() {
  return (
    <section id="about" style={{ paddingBottom: '20px' }}>
      <div className="eyebrow mono reveal">About</div>
      <div className="about-grid">
        <div className="reveal">
          <p>I am a <span className="highlight-circle">Fullstack Developer</span> with a deep interest in UI/UX design. I enjoy building simple, clean, and user-friendly websites while continuously learning new technologies.</p>
          <p>When I'm not coding, I am exploring new ways to enhance standard development processes with modern tooling and design practices.</p>
        </div>
        <div className="reveal about-img-wrap" style={{ display: 'flex', justifyContent: 'center', marginTop: '-30px' }}>
          <img src={beanbag} alt="Relaxing on a beanbag" style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    </section>
  );
}