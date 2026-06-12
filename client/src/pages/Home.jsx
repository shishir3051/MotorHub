import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import FeaturedProducts from '../components/FeaturedProducts';
import BrandStory from '../components/BrandStory';
import TechHighlight from '../components/TechHighlight';
import FeaturedModelDeepDive from '../components/FeaturedModelDeepDive';
import GearAndApparel from '../components/GearAndApparel';
import Testimonials from '../components/Testimonials';
import DealerCTA from '../components/DealerCTA';

export default function Home() {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <Hero />
      <StatsBar />
      <FeaturedProducts />
      <BrandStory />
      <TechHighlight />
      <FeaturedModelDeepDive />
      <GearAndApparel />
      <Testimonials />
      <DealerCTA />
    </div>
  );
}
