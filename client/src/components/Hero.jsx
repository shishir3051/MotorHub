// client/src/components/Hero.jsx
import React, { Suspense, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { initGsap } from '../utils/gsapInit';
import MotorcycleScene from './three/MotorcycleScene';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const fadeOverlayRef = useRef(null);

  useEffect(() => {
    initGsap();
    const section = sectionRef.current;
    const content = contentRef.current;
    const fadeOverlay = fadeOverlayRef.current;
    if (!section || !content || !fadeOverlay) return;

    gsap.set([content, fadeOverlay], { force3D: true });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '60% top',
        scrub: 0.6,
      },
    });

    // Only fade overlay + content — never CSS-transform the WebGL canvas (causes jank)
    tl.to(fadeOverlay, { opacity: 1, ease: 'none' }, 0);
    tl.to(content, { y: -24, opacity: 0, ease: 'none' }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-dark-bg overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 gpu-layer">
        <Suspense fallback={null}>
          <MotorcycleScene immersive className="w-full h-full" />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/40 via-dark-bg/20 to-dark-bg pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-transparent to-dark-bg/80 pointer-events-none" />
        <div
          ref={fadeOverlayRef}
          className="absolute inset-0 bg-dark-bg pointer-events-none opacity-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full min-h-screen flex flex-col justify-center py-24">
        <div ref={contentRef} className="max-w-2xl gpu-layer">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-accent-primary font-semibold text-sm mb-4 tracking-widest uppercase">
              <span className="mr-2">01</span>
              <span className="inline-block w-2 h-2 bg-accent-primary rounded-full align-middle animate-pulse" />
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] font-display">
              Powering
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary bg-[length:200%_auto] animate-shimmer">
                Every Ride
              </span>
            </h1>

            <p className="text-lg md:text-xl text-dark-muted max-w-xl mb-10 leading-relaxed">
              Premium motorcycles engineered for performance. Explore our immersive collection
              of cruisers, sportbikes, and adventure machines.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-accent-primary text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:shadow-accent-primary/40 transition-shadow hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Explore Collection <span>→</span>
              </Link>
              <a
                href="#featured"
                className="px-8 py-4 border border-dark-border hover:border-accent-primary rounded-lg font-semibold transition-colors text-center backdrop-blur-sm bg-dark-bg/30"
              >
                View Featured <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>

        <ScrollReveal className="grid grid-cols-3 gap-8 mt-auto pt-20 border-t border-dark-border/50">
          {[
            { val: '100+', label: 'Premium Models' },
            { val: '15K+', label: 'Happy Riders' },
            { val: '100%', label: 'Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent-primary mb-2">{stat.val}</div>
              <p className="text-dark-muted text-sm">{stat.label}</p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
