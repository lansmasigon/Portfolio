/**
 * useScrollReveal — shared GSAP ScrollTrigger reveal hook.
 *
 * Usage:
 *   const ref = useScrollReveal((tl, el) => {
 *     tl.from(el.querySelector('.title'), { y: 30, autoAlpha: 0, duration: 0.6 });
 *   });
 *   <section ref={ref}>…</section>
 */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(buildTimeline, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // paused:true — timeline won't run until ScrollTrigger fires,
    // so GSAP never applies the from-state prematurely.
    const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });
    buildTimeline(tl, el);

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
