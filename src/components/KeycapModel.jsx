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
const SCATTER_OFFSETS = LOCAL_POSITIONS.map(() => ({
  x: (Math.random() - 0.5) * 280,
  y: (Math.random() - 0.5) * 180,
  z: (Math.random() - 0.5) * 120,
  rx: (Math.random() - 0.5) * Math.PI * 3,
  ry: (Math.random() - 0.5) * Math.PI * 3,
  rz: (Math.random() - 0.5) * Math.PI * 2,
}));

// Some entries in KEYCAPS are accidentally 8-digit hex (#RRGGBBAA). The trailing
// byte was being read as alpha and, against a transparent canvas, was crushing
// those colors toward black. Strip it so every keycap renders fully opaque.
function normalizeHex(hex) {
  const h = hex.replace('#', '');
  return h.length === 8 ? `#${h.slice(0, 6)}` : `#${h}`;
}

// Helpers to shade a flat hex color for gradient/vignette work
function shadeColor(hex, percent) {
  const c = new THREE.Color(normalizeHex(hex));
  const target = percent > 0 ? 1 : 0;
  const amt = Math.abs(percent);
  c.r = c.r + (target - c.r) * amt;
  c.g = c.g + (target - c.g) * amt;
  c.b = c.b + (target - c.b) * amt;
  return `#${c.getHexString()}`;
}

function paintKeycapFace(ctx, S, rawBgColor) {
  const bgColor = normalizeHex(rawBgColor);
  // Soft diagonal gradient: lighter top-left (catching light), darker bottom-right
  const grad = ctx.createLinearGradient(0, 0, S, S);
  grad.addColorStop(0, shadeColor(bgColor, 0.28));
  grad.addColorStop(0.5, bgColor);
  grad.addColorStop(1, shadeColor(bgColor, -0.22));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Radial highlight, like light glancing off a molded plastic surface
  const highlight = ctx.createRadialGradient(S * 0.32, S * 0.28, S * 0.02, S * 0.32, S * 0.28, S * 0.75);
  highlight.addColorStop(0, 'rgba(255,255,255,0.35)');
  highlight.addColorStop(0.35, 'rgba(255,255,255,0.08)');
  highlight.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = highlight;
  ctx.fillRect(0, 0, S, S);

  // Vignette toward the edges, simulating the bevel falling into shadow
  const vignette = ctx.createRadialGradient(S / 2, S / 2, S * 0.35, S / 2, S / 2, S * 0.72);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, S, S);
}

function makeKeycapTexture(svgUrl, bgColor) {
  const S = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d');

  paintKeycapFace(ctx, S, bgColor);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

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
        paintKeycapFace(ctx, S, bgColor);
        const pad = S * 0.18;
        // Faint drop shadow under the icon for extra lift off the surface
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.35)';
        ctx.shadowBlur = S * 0.03;
        ctx.shadowOffsetY = S * 0.012;
        ctx.drawImage(img, pad, pad, S - pad * 2, S - pad * 2);
        ctx.restore();
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
    const emissiveColor = normalizeHex(emissive ?? color);
    c.traverse((child) => {
      if (!child.isMesh) return;
      child.material = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        map: tex,
        emissive: emissiveColor,
        emissiveIntensity: 0.08,
        roughness: 0.35,
        metalness: 0.05,
        clearcoat: 0.65,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.5,
      });
    });
    return c;
  }, [baseScene, svgUrl, color, emissive]);

  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (!progressRef) {
      let rafId;
      const startTime = performance.now();
      const animate = (time) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / 1500, 1); // 1.5s animation
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setInternalProgress(easeProgress);
        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };
      // Add a small delay so they don't immediately scatter on load before scroll
      const timeout = setTimeout(() => {
        rafId = requestAnimationFrame(animate);
      }, 300);
      return () => {
        clearTimeout(timeout);
        cancelAnimationFrame(rafId);
      };
    }
  }, [progressRef]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Use the progressRef passed from the ScrollTrigger, default to internalProgress if not present
    const p = progressRef ? progressRef.current : internalProgress;

    
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
    <Center scale={isMobile ? 0.08 : 0.15}>
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

// Force HMR reload
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
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ width: '100%', height: '100%', background: 'transparent', outline: 'none', border: 'none', borderWidth: 0, display: 'block' }}
        gl={{ alpha: true, antialias: true, premultipliedAlpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        onCreated={({ gl }) => { gl.domElement.style.outline = 'none'; gl.domElement.style.border = 'none'; gl.domElement.setAttribute('tabindex', '-1'); }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 14, 6]}  intensity={2.8} />
        <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#dde8ff" />
        {/* Rim light from behind to separate keycap edges from the background */}
        <directionalLight position={[0, 6, -12]} intensity={1.1} color="#ffffff" />
        <Suspense fallback={<Loader />}>
          <KeycapGrid progressRef={progressRef} isMobile={isMobile} />
          <Environment preset="apartment" environmentIntensity={1.2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/scene.gltf?v=4');