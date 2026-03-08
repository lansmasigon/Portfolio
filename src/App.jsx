import './App.css'
import Home from './components/Home'
import About from './components/About'
import Projects from './components/Projects'
import Awards from './components/Awards'
import Contact from './components/Contact'
import { Analytics } from "@vercel/analytics/react"
import { useEffect, useRef } from 'react'

function App() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };

    let raf;
    const followRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      raf = requestAnimationFrame(followRing);
    };
    raf = requestAnimationFrame(followRing);

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="app">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
      <Home />
      <About />
      <Projects />
      <Awards />
      <Contact />
      <Analytics />
    </div>
  )
}

export default App
