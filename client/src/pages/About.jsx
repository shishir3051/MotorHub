import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="bg-[#0D0D0D] text-[#F2F2F2] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981420-87aa9dad1c89?q=80&w=2000&auto=format&fit=crop" 
            alt="VORAX Racing Heritage" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/50" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-6 block">
              OUR HERITAGE
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-widest leading-none mb-6">
              BORN FROM SPEED.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3C00] to-[#888888]">BUILT TO LAST.</span>
            </h1>
            <p className="text-[#888888] font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              VORAX Moto isn't just a manufacturer. We are an engineering syndicate forged on the track, 
              dedicated to creating the most uncompromising performance machines on the planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-8 flex items-center gap-4">
              <span className="w-12 h-px bg-[#FF3C00]"></span>
              RAW ENGINEERING
            </h2>
            <p className="text-[#888888] font-sans text-lg leading-relaxed mb-6">
              Every VORAX motorcycle begins as a block of aerospace-grade aluminum and a vision of absolute dominance. 
              We don't build bikes for the faint of heart. We strip away the unnecessary, focusing purely on 
              power-to-weight ratios, aggressive aerodynamics, and visceral throttle response.
            </p>
            <p className="text-[#888888] font-sans text-lg leading-relaxed mb-8">
              Our engineering philosophy is simple: If a component doesn't make the machine faster, handle better, 
              or stop quicker, it doesn't belong on a VORAX.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-[#2A2A2B] pt-8">
              <div>
                <div className="text-4xl font-display font-bold text-[#F2F2F2] mb-2">1998</div>
                <div className="text-xs font-display font-bold uppercase tracking-widest text-[#FF3C00]">FOUNDED</div>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-[#F2F2F2] mb-2">14</div>
                <div className="text-xs font-display font-bold uppercase tracking-widest text-[#FF3C00]">WORLD TITLES</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, scale: 0.95 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FF3C00] translate-x-4 translate-y-4" />
            <img 
              src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop" 
              alt="Engine Block" 
              className="relative z-10 w-full h-auto grayscale contrast-125 border border-[#2A2A2B]"
            />
          </motion.div>
        </div>
      </section>

      {/* Visual Break */}
      <section className="h-[40vh] w-full relative overflow-hidden my-12 border-y border-[#2A2A2B]">
        <img 
          src="https://images.unsplash.com/photo-1629555239384-3c40fce10433?q=80&w=2000&auto=format&fit=crop" 
          alt="Track Racing" 
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#FF3C00]/20 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-[0.2em] text-white/90 text-center leading-tight">
            NO COMPROMISE.<br />NO SURRENDER.
          </h2>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-sm block mb-4">
            SYNDICATE NETWORK
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-6">
            GLOBAL DOMINANCE
          </h2>
          <p className="text-[#888888] font-sans text-lg">
            From the winding canyons of California to the high-speed circuits of Europe, 
            the VORAX syndicate operates on a global scale. We support an elite network of 
            dealerships and factory-trained technicians worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { city: 'TOKYO', region: 'APAC HQ', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=600&auto=format&fit=crop' },
            { city: 'LOS ANGELES', region: 'AMERICAS HQ', image: 'https://images.unsplash.com/photo-1580659324420-c08137305d86?q=80&w=600&auto=format&fit=crop' },
            { city: 'MILAN', region: 'EMEA HQ', image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=600&auto=format&fit=crop' }
          ].map((loc, i) => (
            <motion.div 
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-[4/5] group overflow-hidden border border-[#2A2A2B]"
            >
              <img 
                src={loc.image} 
                alt={loc.city} 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="text-[#FF3C00] font-display font-bold uppercase tracking-[0.3em] text-xs mb-2">
                  {loc.region}
                </div>
                <div className="text-3xl font-display font-bold uppercase tracking-widest text-[#F2F2F2]">
                  {loc.city}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
