import { ReactLenis } from 'lenis/react';
import CustomCursor from './CustomCursor';

export default function Layout({ children }) {
  return (
    <ReactLenis root>
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0" 
        style={{ backgroundColor: '#F2F2F0' }}
      >
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            opacity: 0.04 
          }} 
        />
      </div>
      <CustomCursor />
      <main className="relative z-10 overflow-hidden w-full min-h-screen">
        {children}
      </main>
    </ReactLenis>
  );
}
