import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categories = ['cruiser', 'sportbike', 'touring', 'dirt-bike', 'adventure', 'naked-bike'];

const baseModels = {
  'cruiser': [
    { name: 'VORAX V-Iron', basePrice: 16000, engine: '1200cc V-Twin', weight: '240 kg', desc: 'A dark, brooding cruiser that dominates the boulevard.' },
    { name: 'VORAX C5 Custom', basePrice: 15400, engine: '1133cc V-Twin', weight: '250 kg', desc: 'A minimalist bobber with maximum attitude.' },
    { name: 'VORAX Nightfall', basePrice: 18000, engine: '1800cc V-Twin', weight: '290 kg', desc: 'The ultimate midnight rider with endless torque.' },
  ],
  'sportbike': [
    { name: 'VORAX R9', basePrice: 18400, engine: '999cc Inline-4', weight: '189 kg', desc: 'The definitive track weapon tuned for the street.' },
    { name: 'VORAX Apex RS', basePrice: 22000, engine: '600cc Inline-4', weight: '165 kg', desc: 'A purebred track homologation special.' },
    { name: 'VORAX S-RR', basePrice: 24500, engine: '1100cc V4', weight: '195 kg', desc: 'Aerodynamic perfection meets raw superbike power.' },
  ],
  'touring': [
    { name: 'VORAX GT6', basePrice: 19500, engine: '1100cc Inline-4', weight: '265 kg', desc: 'Cross continents in ultimate comfort and uncompromised power.' },
    { name: 'VORAX Horizon', basePrice: 21000, engine: '1600cc Inline-6', weight: '320 kg', desc: 'Luxury grand touring for the modern rider.' },
    { name: 'VORAX Interstate', basePrice: 17500, engine: '1000cc Parallel-Twin', weight: '245 kg', desc: 'Built for the open road with integrated luggage.' },
  ],
  'dirt-bike': [
    { name: 'VORAX MX-250', basePrice: 8500, engine: '250cc Single', weight: '105 kg', desc: 'Lightweight motocross dominance.' },
    { name: 'VORAX Enduro 450', basePrice: 10200, engine: '450cc Single', weight: '115 kg', desc: 'Tackle the toughest trails with 450cc of raw punch.' },
    { name: 'VORAX Trail X', basePrice: 7900, engine: '200cc Single', weight: '98 kg', desc: 'Perfect for beginners and tight technical trails.' },
  ],
  'adventure': [
    { name: 'VORAX DX7', basePrice: 14900, engine: '850cc Twin', weight: '215 kg', desc: 'Built to conquer any terrain. The DX7 is your ultimate adventure companion.' },
    { name: 'VORAX Tundra 1200', basePrice: 18500, engine: '1200cc Boxer', weight: '250 kg', desc: 'Go anywhere, do anything. The pinnacle of adventure touring.' },
    { name: 'VORAX Scout', basePrice: 12000, engine: '650cc Twin', weight: '190 kg', desc: 'Nimble middleweight ADV for everyday exploration.' },
  ],
  'naked-bike': [
    { name: 'VORAX S3 Naked', basePrice: 11800, engine: '750cc Inline-3', weight: '180 kg', desc: 'Stripped down, aggressive, and raw. The S3 is pure riding essence.' },
    { name: 'VORAX S4 Street', basePrice: 13500, engine: '890cc Inline-3', weight: '185 kg', desc: 'The ultimate urban street fighter. Agility meets pure torque.' },
    { name: 'VORAX Brute', basePrice: 16500, engine: '1200cc V-Twin', weight: '210 kg', desc: 'A hyper-naked monster that leaves nothing to the imagination.' },
  ]
};

const imagePools = {
  'cruiser': [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558980394-4c7c92701426?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop'
  ],
  'sportbike': [
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1629555239384-3c40fce10433?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560662660-8484e55e533c?q=80&w=800&auto=format&fit=crop'
  ],
  'touring': [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1626079972322-8d77c3e39b97?q=80&w=800&auto=format&fit=crop'
  ],
  'dirt-bike': [
    'https://images.unsplash.com/photo-1549449080-61fbfd254b41?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522030058223-96b6531be4d8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1569611568478-f7b5ec35b62b?q=80&w=800&auto=format&fit=crop'
  ],
  'adventure': [
    'https://images.unsplash.com/photo-1591147514800-47055ee124bd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558981359-219d6364c9c8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1473665518293-f119e782f9c4?q=80&w=800&auto=format&fit=crop'
  ],
  'naked-bike': [
    'https://images.unsplash.com/photo-1621252994991-5f07c770428e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558980394-0a37b3636f86?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop'
  ]
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Keep the first 8 static for FeaturedProducts.jsx to work
const firstEightIds = [
  '64f1a2b3c4d5e6f7a8b9c001', '64f1a2b3c4d5e6f7a8b9c002', '64f1a2b3c4d5e6f7a8b9c003',
  '64f1a2b3c4d5e6f7a8b9c004', '64f1a2b3c4d5e6f7a8b9c005', '64f1a2b3c4d5e6f7a8b9c006',
  '64f1a2b3c4d5e6f7a8b9c007', '64f1a2b3c4d5e6f7a8b9c008'
];

let generatedCount = 0;
const bikes = [];

// Base 8
const base8 = [
  { category: 'sportbike', modelIndex: 0, id: firstEightIds[0] },
  { category: 'adventure', modelIndex: 0, id: firstEightIds[1] },
  { category: 'cruiser', modelIndex: 0, id: firstEightIds[2] },
  { category: 'naked-bike', modelIndex: 0, id: firstEightIds[3] },
  { category: 'touring', modelIndex: 0, id: firstEightIds[4] },
  { category: 'sportbike', modelIndex: 1, id: firstEightIds[5] },
  { category: 'naked-bike', modelIndex: 1, id: firstEightIds[6] },
  { category: 'cruiser', modelIndex: 1, id: firstEightIds[7] }
];

base8.forEach(b => {
  const baseModel = baseModels[b.category][b.modelIndex];
  const images = imagePools[b.category];
  bikes.push({
    _id: b.id,
    name: baseModel.name,
    brand: 'VORAX',
    category: b.category,
    price: baseModel.basePrice,
    stock: getRandomInt(2, 20),
    description: baseModel.desc,
    specifications: { engine: baseModel.engine, power: getRandomInt(80, 220) + ' BHP', torque: getRandomInt(70, 150) + ' Nm', weight: baseModel.weight },
    images: [{ url: images[0], public_id: `img-${generatedCount}` }],
    featured: generatedCount < 6,
    rating: (Math.random() * (5 - 4) + 4).toFixed(1),
    numReviews: getRandomInt(5, 50)
  });
  generatedCount++;
});

// Generate remaining 150 bikes
while (generatedCount < 160) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const models = baseModels[category];
  const baseModel = models[Math.floor(Math.random() * models.length)];
  const images = imagePools[category];
  
  // Create a variant name
  const year = getRandomInt(2022, 2024);
  const variant = ['Pro', 'Evo', 'Carbon', 'Dark', 'R', 'S'][Math.floor(Math.random() * 6)];
  
  bikes.push({
    _id: new mongoose.Types.ObjectId().toHexString(),
    name: `${baseModel.name} ${variant} (${year})`,
    brand: 'VORAX',
    category: category,
    price: baseModel.basePrice + getRandomInt(-1000, 3000),
    stock: getRandomInt(0, 15),
    description: baseModel.desc,
    specifications: { engine: baseModel.engine, power: getRandomInt(80, 220) + ' BHP', torque: getRandomInt(70, 150) + ' Nm', weight: baseModel.weight },
    images: [{ url: images[Math.floor(Math.random() * images.length)], public_id: `img-${generatedCount}` }],
    featured: false,
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
    numReviews: getRandomInt(0, 40)
  });
  
  generatedCount++;
}

const fileContent = `// Auto-generated by script
export const getMotorcycleSeedData = () => ${JSON.stringify(bikes, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'motorcycleSeedData.js'), fileContent);
console.log('Successfully generated 160 motorcycles');
