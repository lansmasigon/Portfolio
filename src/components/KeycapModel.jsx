import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

const KEYCAPS = [
  { label: 'React',      svgUrl: '/icons/react.svg',      color: '#4F5A6C' },
  { label: 'JS',         svgUrl: '/icons/javascript.svg', color: '#F2CF2C' },
  { label: 'TypeScript', svgUrl: '/icons/typescript.svg', color: '#3178C6' },
  { label: 'Python',     svgUrl: '/icons/python.svg',     color: '#070a6bff' },
  { label: 'Supabase',   svgUrl: '/icons/supabase.svg',   color: '#95f5c73c'},
  { label: 'Git',        svgUrl: '/icons/git.svg',        color: '#f4a16aff' },
  { label: 'Convex',     svgUrl: '/icons/convex.svg',     color: '#c5bbb73f'},
  { label: 'CSS',        svgUrl: '/icons/css3.svg',       color: '#264DE4' },
  { label: 'HTML',       svgUrl: '/icons/html5.svg',      color: '#E34F26' },
  { label: 'MySQL',      svgUrl: '/icons/mysql.svg',      color: '#30badaff' },
  { label: 'Figma',      svgUrl: '/icons/figma.svg',      color: '#3666afff' },
  { label: 'PHP',        svgUrl: '/icons/php.svg',        color: '#8993BE' },
];

const COLS = 4, ROWS = 3, STEP_X = 20, STEP_Z = 20;

const LOCAL_POSITIONS = Array.from({ length: ROWS * COLS }, (_, i) => [
  (i % COLS - (COLS - 1) / 2) * STEP_X,
  0,
  (Math.floor(i / COLS) - (ROWS - 1) / 2) * STEP_Z,
]);

// Random scatter offsets — large, chaotic initial positions
const SCATTER_OFFSETS = LOCAL_POSITIONS.map((_, i) => ({
  x: (Math.random() - 0.5) * 280,
  y: (Math.random() - 0.5) * 180,
  z: (Math.random() - 0.5) * 120,
  rx: (Math.random() - 0.5) * Math.PI * 3,
  ry: (Math.random() - 0.5) * Math.PI * 3,
  rz: (Math.random() - 0.5) * Math.PI * 2,
}));

function makeKeycapTexture(svgUrl, bgColor) {
  const S = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, S, S);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;

  fetch(svgUrl, { mode: 'cors' })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch ${svgUrl}`);
      return res.text();
    })
    .then((svgText) => {
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, S, S);
        const pad = S * 0.18;
        ctx.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
        tex.needsUpdate = true;
        URL.revokeObjectURL(url);
      };
      img.onerror = () => { 
        console.error('Image load error for:', svgUrl);
        URL.revokeObjectURL(url); 
      };
      img.src = url;
    })
    .catch((err) => console.warn('Failed to fetch SVG:', svgUrl, err));

  return tex;
}

function Loader() {
  return <Html center><div style={{ color: 'rgba(242,237,230,0.5)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>LOADING</div></Html>;
}

function SingleKeycap({ index, position, svgUrl, color, emissive, baseScene, progressRef, isMobile }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pressY = useRef(0);

  const scatter = SCATTER_OFFSETS[index];

  const mesh = useMemo(() => {
    const tex = makeKeycapTexture(svgUrl, color);
    const c = baseScene.clone(true);
    const emissiveColor = emissive ?? color;
    c.traverse((child) => {
      if (!child.isMesh) return;
      child.material = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        map: tex,
        emissive: emissiveColor,
        emissiveIntensity: 0.18,
        roughness: 0.2,
        metalness: 0.15,
      });
    });
    return c;
  }, [baseScene, svgUrl, color, emissive]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Use the progressRef passed from the ScrollTrigger, default to 1 if not present
    const p = progressRef ? progressRef.current : 1;
    
    // Skip animation on mobile by forcing progress to 1
    let smoothP = isMobile ? 1 : p;
    
    // Optional stagger mapping (uncomment to apply):
    // const staggerStart = (index / KEYCAPS.length) * 0.3;
    // const staggerEnd = staggerStart + 0.7;
    // smoothP = THREE.MathUtils.clamp((p - staggerStart) / (staggerEnd - staggerStart), 0, 1);

    // Interpolate position from scatter to grid
    const [tx, ty, tz] = position;
    groupRef.current.position.x = scatter.x + (tx - scatter.x) * smoothP;
    groupRef.current.position.z = scatter.z + (tz - scatter.z) * smoothP;

    // Hover press animation on y
    const targetHoverY = hovered ? -3.5 : 0;
    pressY.current = THREE.MathUtils.lerp(pressY.current, targetHoverY, 1 - Math.pow(0.01, delta * 12));
    const scatterY = scatter.y;
    groupRef.current.position.y = scatterY + (ty + pressY.current - scatterY) * smoothP;

    // Interpolate rotation
    groupRef.current.rotation.x = scatter.rx * (1 - smoothP);
    groupRef.current.rotation.y = scatter.ry * (1 - smoothP);
    groupRef.current.rotation.z = scatter.rz * (1 - smoothP);
  });

  return (
    <group>
      <group ref={groupRef}>
        <primitive object={mesh} />
      </group>
      <mesh
        position={[position[0], position[1] + 5, position[2]]}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true);  document.body.style.cursor = 'pointer'; }}
        onPointerLeave={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[18, 14, 18]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function KeycapGrid({ progressRef, isMobile }) {
  const { scene: baseScene } = useGLTF('/scene.gltf?v=4');
  return (
    <Center scale={isMobile ? 0.095 : 0.08}>
      <group rotation={[0.72, -0.52, 0]}>
        {KEYCAPS.map((cap, i) => (
          <SingleKeycap
            key={cap.label}
            index={i}
            position={LOCAL_POSITIONS[i]}
            svgUrl={cap.svgUrl}
            color={cap.color}
            emissive={cap.emissive}
            baseScene={baseScene}
            progressRef={progressRef}
            isMobile={isMobile}
          />
        ))}
      </group>
    </Center>
  );
}

export default function KeycapModel({ progressRef }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', outline: 'none', border: 'none', borderWidth: 0, background: 'transparent' }}>
      <Canvas
        tabIndex={-1}
        camera={{ position: [0, 0, 10], fov: 40 }}
        style={{ width: '100%', height: '100%', background: 'transparent', outline: 'none', border: 'none', borderWidth: 0, display: 'block' }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
        onCreated={({ gl }) => { gl.domElement.style.outline = 'none'; gl.domElement.style.border = 'none'; gl.domElement.setAttribute('tabindex', '-1'); }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 14, 6]}  intensity={2.0} />
        <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#dde8ff" />
        <Suspense fallback={<Loader />}>
          <KeycapGrid progressRef={progressRef} isMobile={isMobile} />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/scene.gltf?v=4');
