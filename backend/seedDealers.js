import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Dealer from './models/Dealer.js';

dotenv.config();

const dealers = [
  {
    name: 'VORAX SYNDICATE TOKYO',
    region: 'APAC',
    address: '1-chōme-2-3 Shibuya, Shibuya City, Tokyo 150-0002, Japan',
    phone: '+81 3-1234-5678',
    email: 'tokyo@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1542051812871-75f412ba7e7f?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    name: 'VORAX SYNDICATE LOS ANGELES',
    region: 'AMERICAS',
    address: '1000 S Hope St, Los Angeles, CA 90015, USA',
    phone: '+1 213-555-0198',
    email: 'la@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    name: 'VORAX SYNDICATE MILAN',
    region: 'EMEA',
    address: 'Via Montenapoleone, 8, 20121 Milano MI, Italy',
    phone: '+39 02 1234 5678',
    email: 'milan@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    name: 'VORAX BERLIN OUTPOST',
    region: 'EMEA',
    address: 'Friedrichstraße 43, 10117 Berlin, Germany',
    phone: '+49 30 98765432',
    email: 'berlin@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1560662660-8484e55e533c?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    name: 'VORAX LONDON OUTPOST',
    region: 'EMEA',
    address: '100 Shoreditch High St, London E1 6JQ, UK',
    phone: '+44 20 7123 4567',
    email: 'london@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    name: 'VORAX SYDNEY OUTPOST',
    region: 'APAC',
    address: 'George St, Sydney NSW 2000, Australia',
    phone: '+61 2 1234 5678',
    email: 'sydney@voraxmoto.com',
    image: 'https://images.unsplash.com/photo-1621252994991-5f07c770428e?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Dealer.deleteMany({});
    console.log('Cleared existing dealers');
    await Dealer.insertMany(dealers);
    console.log('Dealers seeded successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error seeding dealers:', error);
    process.exit(1);
  });
