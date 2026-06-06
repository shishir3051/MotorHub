import React, { Suspense } from 'react';
import ScrollReveal from '../ScrollReveal';
import MotorcycleScene from './MotorcycleScene';

export default function ScrollScene3D() {
  return (
    <section className="relative py-32 bg-dark-bg border-t border-dark-border overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <span className="text-accent-primary font-semibold text-sm tracking-widest uppercase">
              <span className="mr-2">03</span>
              <span className="inline-block w-2 h-2 bg-accent-primary rounded-full align-middle" />
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-display leading-tight">
              Engineered for
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
                Peak Performance
              </span>
            </h2>
            <p className="text-dark-muted text-lg leading-relaxed max-w-lg">
              Every machine in our collection is precision-built with cutting-edge technology,
              premium materials, and relentless attention to detail — from the engine core to the final polish.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-dark-border">
              {[
                { val: '950', unit: 'km/h', label: 'Top Speed' },
                { val: '214', unit: 'hp', label: 'Max Power' },
                { val: '6', unit: 'cats', label: 'Categories' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent-primary">
                    {stat.val}
                    <span className="text-sm text-dark-muted ml-1">{stat.unit}</span>
                  </div>
                  <div className="text-xs text-dark-muted uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1} className="order-1 lg:order-2">
            <div className="h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-dark-border shadow-2xl shadow-accent-primary/10 gpu-layer">
              <Suspense fallback={<div className="w-full h-full bg-dark-card animate-pulse" />}>
                <MotorcycleScene immersive />
              </Suspense>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
