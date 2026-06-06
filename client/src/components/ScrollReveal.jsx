import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { initGsap } from '../utils/gsapInit';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) {
  const ref = useRef(null);

  useEffect(() => {
    initGsap();
    const el = ref.current;
    if (!el) return;

    const fromVars = { opacity: 0 };
    if (direction === 'up') fromVars.y = 28;
    if (direction === 'left') fromVars.x = -28;
    if (direction === 'right') fromVars.x = 28;

    gsap.set(el, { willChange: 'transform, opacity', force3D: true });

    const tween = gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onComplete: () => gsap.set(el, { clearProps: 'willChange' }),
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
