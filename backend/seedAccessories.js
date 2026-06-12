import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Motorcycle from './models/Motorcycle.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const items = [
  // GEAR & APPAREL
  {
    name: 'Alpinestars Honda Racing Jacket',
    brand: 'Honda',
    price: 450.00,
    description: 'Official Honda Racing Corporation (HRC) leather jacket by Alpinestars. Premium cowhide leather with CE-certified protectors.',
    specifications: { material: 'Leather', armor: 'CE Level 2' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=800&auto=format&fit=crop', alt: 'Honda Racing Jacket' }],
    stock: 20,
    rating: 4.8,
    featured: true
  },
  {
    name: 'Yamaha Revstar Carbon Helmet',
    brand: 'Yamaha',
    price: 650.00,
    description: 'Ultra-lightweight carbon helmet featuring Yamaha factory racing graphics. DOT and ECE certified for maximum track protection.',
    specifications: { material: 'Carbon Fiber', certification: 'DOT & ECE 22.06', weight: '1300g' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=800&auto=format&fit=crop', alt: 'Yamaha Carbon Helmet' }],
    stock: 15,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Kawasaki Ninja Riding Gloves',
    brand: 'Kawasaki',
    price: 120.00,
    description: 'Official Kawasaki Ninja branded riding gloves. Full leather construction with carbon fiber knuckle protection.',
    specifications: { material: 'Leather', protection: 'Carbon Knuckles' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1620023617329-1bc945fb4ba3?q=80&w=800&auto=format&fit=crop', alt: 'Kawasaki Gloves' }],
    stock: 50,
    rating: 4.7,
    featured: false
  },
  {
    name: 'Suzuki GSX-R Track Boots',
    brand: 'Suzuki',
    price: 299.00,
    description: 'High-performance track boots optimized for sport riding. Features advanced ankle bracing and replaceable sliders.',
    specifications: { material: 'Microfiber', protection: 'TPU Ankle Brace' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1626083049102-1a48cce6e37f?q=80&w=800&auto=format&fit=crop', alt: 'Suzuki Boots' }],
    stock: 25,
    rating: 4.6,
    featured: false
  },
  {
    name: 'Harley-Davidson Heritage Leather Vest',
    brand: 'Harley-Davidson',
    price: 199.00,
    description: 'Classic heavy-duty leather riding vest with the iconic Bar & Shield logo. Perfect for cruiser enthusiasts.',
    specifications: { material: 'Heavyweight Cowhide' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=800&auto=format&fit=crop', alt: 'Harley Leather Vest' }],
    stock: 40,
    rating: 4.9,
    featured: true
  },
  {
    name: 'KTM Adventure Rally Suit',
    brand: 'KTM',
    price: 899.00,
    description: 'GORE-TEX fully waterproof adventure touring suit. Designed for extreme climates and hardcore off-road trails.',
    specifications: { material: 'GORE-TEX Pro', armor: 'D3O Level 2' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=800&auto=format&fit=crop', alt: 'KTM Adventure Suit' }],
    stock: 12,
    rating: 5.0,
    featured: true
  },
  {
    name: 'Royal Enfield Classic Open-Face Helmet',
    brand: 'Royal Enfield',
    price: 150.00,
    description: 'Vintage-style open face helmet featuring hand-painted pinstripes that perfectly match the Classic 350.',
    specifications: { material: 'Fiberglass', certification: 'DOT' },
    category: 'gear',
    images: [{ url: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?q=80&w=800&auto=format&fit=crop', alt: 'Royal Enfield Helmet' }],
    stock: 35,
    rating: 4.5,
    featured: false
  },

  // PARTS / ACCESSORIES
  {
    name: 'Honda CBR Akrapovič Exhaust',
    brand: 'Honda',
    price: 1100.00,
    description: 'Full titanium racing exhaust system designed specifically for the Honda CBR series. Reduces weight by 10 lbs.',
    specifications: { material: 'Titanium', fitment: 'CBR1000RR-R / CBR600RR' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1598460613278-8314ff5f6e80?q=80&w=800&auto=format&fit=crop', alt: 'Akrapovic Exhaust' }],
    stock: 8,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Yamaha MT Series Windscreen',
    brand: 'Yamaha',
    price: 120.00,
    description: 'Aerodynamic tinted flyscreen for Yamaha MT hyper-naked motorcycles. Reduces wind fatigue on the highway.',
    specifications: { material: 'Polycarbonate', fitment: 'MT-07 / MT-09' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1616421443658-005663ef020f?q=80&w=800&auto=format&fit=crop', alt: 'Yamaha Windscreen' }],
    stock: 45,
    rating: 4.7,
    featured: false
  },
  {
    name: 'Kawasaki Ninja Frame Sliders',
    brand: 'Kawasaki',
    price: 89.00,
    description: 'No-cut frame sliders providing essential drop protection for your Kawasaki sportbike fairings and engine.',
    specifications: { material: 'Delrin / Aluminum', fitment: 'Ninja 400 / 650 / ZX-6R' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1631583348123-5777bd36f56f?q=80&w=800&auto=format&fit=crop', alt: 'Kawasaki Frame Sliders' }],
    stock: 60,
    rating: 4.8,
    featured: false
  },
  {
    name: 'Suzuki V-Strom Aluminum Panniers',
    brand: 'Suzuki',
    price: 850.00,
    description: 'Rugged 37L left and right aluminum side cases for V-Strom models. Perfect for cross-country touring.',
    specifications: { capacity: '37L each', fitment: 'V-Strom 650 / 800 / 1050' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1610408544955-408aeb582cae?q=80&w=800&auto=format&fit=crop', alt: 'Suzuki Panniers' }],
    stock: 12,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Harley-Davidson Boom! Audio Stage II',
    brand: 'Harley-Davidson',
    price: 950.00,
    description: 'High-output fairing speakers and amplifier kit to blast your favorite tunes over highway wind noise.',
    specifications: { power: '150W per channel', fitment: 'Street Glide / Road Glide' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1616421443658-005663ef020f?q=80&w=800&auto=format&fit=crop', alt: 'Harley Audio Kit' }],
    stock: 15,
    rating: 4.8,
    featured: false
  },
  {
    name: 'KTM PowerParts Skid Plate',
    brand: 'KTM',
    price: 249.00,
    description: 'Heavy-duty aluminum bash plate designed to protect the engine cases of your KTM Adventure from rocks and debris.',
    specifications: { material: '4mm Aluminum', fitment: '790 / 890 / 1290 Adventure' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1631583348123-5777bd36f56f?q=80&w=800&auto=format&fit=crop', alt: 'KTM Skid Plate' }],
    stock: 25,
    rating: 4.9,
    featured: false
  },
  {
    name: 'Royal Enfield Touring Seat',
    brand: 'Royal Enfield',
    price: 180.00,
    description: 'Premium dual-density foam touring seat. Upgrades the long-distance comfort of your Interceptor 650 or Continental GT.',
    specifications: { material: 'Premium Vinyl / 3D Net', fitment: 'INT650 / GT650' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1610408544955-408aeb582cae?q=80&w=800&auto=format&fit=crop', alt: 'Royal Enfield Touring Seat' }],
    stock: 30,
    rating: 4.7,
    featured: false
  },
  {
    name: 'Bajaj Pulsar Performance Air Filter',
    brand: 'Bajaj Auto',
    price: 45.00,
    description: 'High-flow washable air filter for the Pulsar NS200 and RS200. Improves throttle response and intake sound.',
    specifications: { material: 'Cotton Gauze', fitment: 'Pulsar 200 series' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1598460613278-8314ff5f6e80?q=80&w=800&auto=format&fit=crop', alt: 'Bajaj Air Filter' }],
    stock: 100,
    rating: 4.5,
    featured: false
  },
  {
    name: 'TVS Apache Racing Rearset',
    brand: 'TVS Motor',
    price: 199.00,
    description: 'Adjustable CNC machined rearsets for Apache RR 310, enabling a more aggressive track posture.',
    specifications: { material: 'Aluminum', fitment: 'Apache RR 310' },
    category: 'accessories',
    images: [{ url: 'https://images.unsplash.com/photo-1631583348123-5777bd36f56f?q=80&w=800&auto=format&fit=crop', alt: 'TVS Rearset' }],
    stock: 20,
    rating: 4.8,
    featured: false
  }
];

const seedDB = async () => {
  try {
    // Delete existing gear and accessories
    await Motorcycle.deleteMany({ category: { $in: ['accessories', 'gear'] } });
    console.log('Cleared existing gear and accessories');

    // Insert new items
    await Motorcycle.insertMany(items);
    console.log('Branded Gear & Accessories Imported!');
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
