import KeycapModel from './KeycapModel';

// Force HMR reload
export default function TechStack() {
  return (
    <section id="tech-stack" style={{ position: 'relative', height: '520px', display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingBottom: '0px' }}>
      <div className="eyebrow mono reveal">Tech Stack</div>
      <h2 className="section-title reveal" style={{ marginBottom: '32px' }}>Tools & Technologies</h2>
      <div className="reveal" style={{ flex: 1, width: '100%', position: 'relative', marginTop: '-10px' }}>
        <KeycapModel />
      </div>
    </section>
  );
}