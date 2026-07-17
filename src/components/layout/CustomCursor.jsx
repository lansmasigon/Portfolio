import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power3' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power3' });

    const moveCursor = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText(target.getAttribute('data-cursor'));
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorText('');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-[#4F46E5] rounded-full pointer-events-none z-[9999] transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] flex items-center justify-center transition-all duration-300 ease-out ${
          isHovering 
            ? 'w-16 h-16 bg-white border border-gray-200 text-black shadow-sm' 
            : 'w-6 h-6 border-[0.5px] border-[#4F46E5]'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span 
          ref={textRef} 
          className={`text-[10px] font-bold tracking-widest transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
        >
          {cursorText}
        </span>
      </div>
    </>
  );
}
