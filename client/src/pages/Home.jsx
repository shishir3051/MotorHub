// client/src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import CategoryShowcase from '../components/CategoryShowcase';
import ScrollScene3D from '../components/three/ScrollScene3D';
import FeaturedProducts from '../components/FeaturedProducts';
import Services from '../components/Services';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoryShowcase />
      <ScrollScene3D />
      <FeaturedProducts />
      <Services />
      <Newsletter />
    </div>
  );
}
