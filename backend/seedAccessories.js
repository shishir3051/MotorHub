import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Motorcycle from './models/Motorcycle.js'; // We are storing accessories here!

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error(err));

const accessories = [
  {
    name: 'Arai Corsair-X Helmet',
    brand: 'Arai',
    model: 'Corsair-X',
    year: 2024,
    price: 899.99,
    description: 'The Corsair-X has taken helmet technology and rider protection one step further by engineering a helmet that not only protects against direct impacts, but is specifically designed to minimize the effect of "glancing off" impacts as well.',
    specifications: {
      engine: 'Helmet', // Using engine field for Accessory Type temporarily if needed, or we just leave it blank
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Arai+Helmet', alt: 'Arai Helmet' }],
    stock: 25,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Alpinestars GP Plus R V3 Leather Jacket',
    brand: 'Alpinestars',
    model: 'GP Plus R V3',
    year: 2024,
    price: 549.95,
    description: 'A premium full grain leather jacket fully optimized for track and performance riding. The GP Plus R v3 Leather Jacket is anatomically profiled for a fully optimized female fit.',
    specifications: {
      engine: 'Jacket',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Alpinestars+Jacket', alt: 'Leather Jacket' }],
    stock: 40,
    rating: 4.8,
    featured: true
  },
  {
    name: 'Dainese Full Metal 6 Gloves',
    brand: 'Dainese',
    model: 'Full Metal 6',
    year: 2024,
    price: 429.95,
    description: 'The Dainese Full Metal 6 Gloves represent the pinnacle of Dainese track glove technology. Improved comfort and outstanding protection from a top performer packed with innovations and advanced technologies.',
    specifications: {
      engine: 'Gloves',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Dainese+Gloves', alt: 'Racing Gloves' }],
    stock: 15,
    rating: 4.7,
    featured: false
  },
  {
    name: 'Shoei RF-1400 Helmet',
    brand: 'Shoei',
    model: 'RF-1400',
    year: 2024,
    price: 579.99,
    description: 'The Shoei RF-1400 Helmet is the latest generation in the most prestigious pedigree of premium full-face motorcycle helmets.',
    specifications: {
      engine: 'Helmet',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Shoei+Helmet', alt: 'Shoei Helmet' }],
    stock: 30,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Kriega R25 Backpack',
    brand: 'Kriega',
    model: 'R25',
    year: 2024,
    price: 199.00,
    description: 'The R25 is Kriega\'s most popular backpack. It features the Quadloc harness which transfers weight from the shoulders to the chest and body, giving all-day riding comfort.',
    specifications: {
      engine: 'Luggage',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Kriega+Backpack', alt: 'Kriega Backpack' }],
    stock: 50,
    rating: 4.8,
    featured: false
  },
  {
    name: 'Cardo Packtalk Edge',
    brand: 'Cardo',
    model: 'Packtalk Edge',
    year: 2024,
    price: 389.95,
    description: 'The Cardo Packtalk Edge is a premium Bluetooth and Mesh communicator. Featuring an Air Mount magnetic system, JBL speakers, and second generation Dynamic Mesh Communication.',
    specifications: {
      engine: 'Electronics',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Cardo+Packtalk', alt: 'Cardo Packtalk' }],
    stock: 20,
    rating: 4.9,
    featured: true
  },
  {
    name: 'Rev\'It! Sand 4 H2O Jacket',
    brand: 'Rev\'It!',
    model: 'Sand 4 H2O',
    year: 2024,
    price: 499.99,
    description: 'The Sand 4 H2O jacket takes riders almost anywhere in style and total comfort. It features a highly abrasion-resistant yet lightweight outer shell.',
    specifications: {
      engine: 'Jacket',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=RevIt+Jacket', alt: 'Adventure Jacket' }],
    stock: 22,
    rating: 4.7,
    featured: false
  },
  {
    name: 'Forma Adventure Boots',
    brand: 'Forma',
    model: 'Adventure',
    year: 2024,
    price: 279.00,
    description: 'Designed specifically for ADV riders, the Forma Adventure Boots combine the comfort and flexibility of a road boot with the protective features of off-road boots.',
    specifications: {
      engine: 'Boots',
    },
    category: 'accessories',
    images: [{ url: 'https://placehold.co/600x400?text=Forma+Boots', alt: 'Adventure Boots' }],
    stock: 18,
    rating: 4.6,
    featured: false
  }
];

const seedDB = async () => {
  try {
    // Delete existing accessories first
    await Motorcycle.deleteMany({ category: 'accessories' });
    console.log('Cleared existing accessories');

    // Insert new accessories
    await Motorcycle.insertMany(accessories);
    console.log('Accessories Imported!');
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
