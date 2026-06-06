import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { CATEGORIES } from '../constants/categories';

const showcaseItems = CATEGORIES.filter((c) => c.value).map((cat, i) => ({
  ...cat,
  number: String(i + 1).padStart(2, '0'),
  description: {
    cruiser: 'Relaxed riding with classic styling and powerful low-end torque.',
    sportbike: 'Track-bred performance with razor-sharp handling and aerodynamics.',
    touring: 'Long-distance comfort with premium features and luggage capacity.',
    'dirt-bike': 'Lightweight off-road machines built for trails and motocross.',
    adventure: 'Go-anywhere capability with upright ergonomics and long travel.',
    'naked-bike': 'Streetfighter attitude with versatile everyday performance.',
  }[cat.value],
}));

export default function CategoryShowcase() {
  return (
    <section className="py-24 bg-dark-bg border-t border-dark-border relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="mb-16">
          <span className="text-accent-primary font-semibold text-sm tracking-widest uppercase">
            <span className="mr-2">02</span>
            <span className="inline-block w-2 h-2 bg-accent-primary rounded-full align-middle" />
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 mb-4 font-display">
            Unmatched <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Categories</span>
          </h2>
          <p className="text-dark-muted text-lg max-w-2xl">
            Six distinct riding experiences. Find the perfect machine for your style.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {showcaseItems.map((item, index) => (
            <ScrollReveal key={item.value} delay={index * 0.08} className="h-full">
              <TiltCard className="h-full">
                <Link
                  to={`/shop?category=${item.value}`}
                  className="group flex flex-col h-full bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-accent-primary transition-all duration-500 hover:shadow-xl hover:shadow-accent-primary/10"
                >
                  <div className="h-48 flex-shrink-0 overflow-hidden bg-dark-bg">
                    <img
                      src={`/images/motorcycles/${item.value}.svg`}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-accent-primary text-xs font-bold tracking-widest">{item.number}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-accent-primary transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-dark-muted text-sm leading-relaxed flex-1 line-clamp-3">
                      {item.description}
                    </p>
                    <span className="inline-block mt-4 text-accent-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </span>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
