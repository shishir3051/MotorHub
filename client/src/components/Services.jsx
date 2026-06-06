// client/src/components/Services.jsx
import React from 'react';
import { FiTruck, FiShield, FiDollarSign, FiHeadphones } from 'react-icons/fi';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

const services = [
  {
    number: '01',
    icon: FiTruck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $500. Get your motorcycle delivered safely within 2-3 business days.',
  },
  {
    number: '02',
    icon: FiShield,
    title: 'Warranty Coverage',
    description: 'Full manufacturer warranty on all bikes. Extended warranty options available for peace of mind.',
  },
  {
    number: '03',
    icon: FiDollarSign,
    title: 'Flexible Payment',
    description: 'Multiple payment options including installments. 0% APR financing available on select models.',
  },
  {
    number: '04',
    icon: FiHeadphones,
    title: '24/7 Support',
    description: 'Dedicated customer support team. Live chat, email, and phone support available round the clock.',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-16">
          <span className="text-accent-primary font-semibold text-sm tracking-widest uppercase">
            <span className="mr-2">05</span>
            <span className="inline-block w-2 h-2 bg-accent-primary rounded-full align-middle" />
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 font-display">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">MotorHub</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={index * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <div className="group flex flex-col h-full bg-dark-card border border-dark-border rounded-lg p-6 hover:border-accent-primary transition-all hover:shadow-lg hover:shadow-accent-primary/10">
                    <div className="text-accent-primary font-bold text-sm mb-4">{service.number}</div>
                    <Icon className="w-8 h-8 mb-4 text-accent-primary group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-dark-muted text-sm flex-1">{service.description}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
