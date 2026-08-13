import dp from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section id="profile" className="hero">
      <div className="hero-top reveal" style={{ alignItems: 'center' }}>
        <div className="avatar">
          <img src={dp} alt="Lance Gabriel Masigon" />
        </div>
        <div>
          <h1 className="hero-title">Lance Gabriel Masigon</h1>
          <div className="role" style={{ margin: 0, marginTop: '8px' }}>Full-Stack Developer</div>
        </div>
      </div>
      <p className="tagline reveal" style={{ marginTop: '24px' }}>
        I build simple, clean, and user-friendly websites while continuously learning new technologies.
      </p>
      <div className="btn-row reveal">
        <a className="btn primary" href="mailto:lancemasigon@gmail.com">Get in touch</a>
        <a className="icon-link" href="https://github.com/lansmasigon" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.42.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"/></svg>
        </a>
        <a className="icon-link" href="https://linkedin.com/in/lancegabrielmasigon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>
        </a>
        <a className="icon-link" href="mailto:lancemasigon@gmail.com" aria-label="Email" title="Email">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18v12H3z"/><path d="m3 7 9 6 9-6"/></svg>
        </a>
      </div>
    </section>
  );
}