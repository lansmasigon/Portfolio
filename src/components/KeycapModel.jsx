import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Html, Bounds, useBounds, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

  fetch(svgUrl)
    .then((res) => res.text())
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
      img.onerror = () => { URL.revokeObjectURL(url); };
      img.src = url;
    })
    .catch(() => console.warn('Failed to fetch SVG:', svgUrl));

  return tex;
}

function Loader() {
  return <Html center><div style={{ color: 'rgba(242,237,230,0.5)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>LOADING</div></Html>;
}

function AutoFit({ children }) {
  const bounds = useBounds();
  return <group ref={(r) => { if (r) bounds.refresh(r).fit(); }}>{children}</group>;
}

function SingleKeycap({ index, position, svgUrl, color, emissive, baseScene, assembled }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const pressY = useRef(0);

  const scatter = SCATTER_OFFSETS[index];

  // Animated progress: 0 = scattered, 1 = assembled
  const progress = useRef(0);

  useEffect(() => {
    const obj = { p: 0 };
    const tween = gsap.to(obj, {
      p: 1,
      duration: 1.2,
      ease: 'power3.out',
      delay: assembled ? index * 0.06 : 0,
      paused: !assembled,
      onUpdate: () => {
        progress.current = obj.p;
      },
    });
    if (assembled) tween.play();
    else {
      progress.current = 0;
    }
    return () => tween.kill();
  }, [assembled, index]);

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
    const p = progress.current;

    // Interpolate position from scatter to grid
    const [tx, ty, tz] = position;
    groupRef.current.position.x = scatter.x + (tx - scatter.x) * p;
    groupRef.current.position.z = scatter.z + (tz - scatter.z) * p;

    // Hover press animation on y
    const targetHoverY = hovered ? -3.5 : 0;
    pressY.current = THREE.MathUtils.lerp(pressY.current, targetHoverY, 1 - Math.pow(0.01, delta * 12));
    const scatterY = scatter.y;
    groupRef.current.position.y = scatterY + (ty + pressY.current - scatterY) * p;

    // Interpolate rotation
    groupRef.current.rotation.x = scatter.rx * (1 - p);
    groupRef.current.rotation.y = scatter.ry * (1 - p);
    groupRef.current.rotation.z = scatter.rz * (1 - p);
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

function KeycapGrid({ assembled }) {
  const { scene: baseScene } = useGLTF('/scene.gltf?v=4');
  return (
    <Bounds fit clip observe margin={1.08}>
      <AutoFit>
        <Center>
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
                assembled={assembled}
              />
            ))}
          </group>
        </Center>
      </AutoFit>
    </Bounds>
  );
}

export default function KeycapModel() {
  const [assembled, setAssembled] = useState(false);
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => setAssembled(true),
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={canvasWrapRef} style={{ width: '100%', height: '100%', outline: 'none', border: 'none', borderWidth: 0, background: 'transparent' }}>
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
          <KeycapGrid assembled={assembled} />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('/scene.gltf?v=4');

