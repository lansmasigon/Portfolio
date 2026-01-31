import { useEffect, useRef, useState } from 'react';
import './CardSwap.css';

export function Card({ children }) {
  return <div className="card">{children}</div>;
}

export default function CardSwap({
  children,
  cardDistance = 5,
  verticalDistance = 15,
  delay = 4500,
  pauseOnHover = false,
  onIndexChange,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const cards = Array.isArray(children) ? children : [children];

  useEffect(() => {
    if (isPaused && pauseOnHover) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % cards.length;
        if (onIndexChange) {
          onIndexChange(newIndex);
        }
        return newIndex;
      });
    }, delay);

    return () => clearInterval(interval);
  }, [cards.length, delay, isPaused, pauseOnHover, onIndexChange]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="card-swap-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {cards.map((card, index) => {
        const position = (index - currentIndex + cards.length) % cards.length;
        const isActive = position === 0;
        
        const style = {
          transform: `
            translate(-50%, -50%)
            translateX(${position * cardDistance}px)
            translateY(${position * -verticalDistance}px)
            rotateX(${position * -5}deg)
            rotateY(${position * 5}deg)
            scale(${1 - position * 0.05})
          `,
          zIndex: cards.length - position,
          opacity: position > 2 ? 0 : 1,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isActive ? 'auto' : 'none',
        };

        return (
          <div key={index} className="card" style={style}>
            {card}
          </div>
        );
      })}
    </div>
  );
}
