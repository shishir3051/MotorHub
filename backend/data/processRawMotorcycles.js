import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawDataPath = path.join(__dirname, 'rawMotorcycles.json');
const newDataPath = path.join(__dirname, 'newMotorcycles.json');

const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
let combinedData = rawData;

if (fs.existsSync(newDataPath)) {
  const newData = JSON.parse(fs.readFileSync(newDataPath, 'utf8'));
  combinedData = [...rawData, ...newData];
  // Optional: write back to rawMotorcycles.json
  fs.writeFileSync(rawDataPath, JSON.stringify(combinedData, null, 2), 'utf8');
}

const typeToCategory = {
  'Sport': 'sportbike',
  'Track Only': 'sportbike',
  'Adventure': 'adventure',
  'Adventure crossover': 'adventure',
  'Adventure Crossover': 'adventure',
  'Dual Sport': 'adventure',
  'Naked': 'naked-bike',
  'Heritage': 'naked-bike',
  'Cafe Racer': 'naked-bike',
  'Roadster': 'naked-bike',
  'Custom Roadster': 'naked-bike',
  'Supermoto': 'naked-bike',
  'Touring': 'touring',
  'Sport Touring': 'touring',
  'Cruiser': 'cruiser',
  'Diesel Cruiser': 'cruiser',
  'Minimoto': 'naked-bike',
  'Scooter': 'naked-bike',
  'Electric Scooter': 'naked-bike',
  'Moped': 'naked-bike',
  'Electric': 'naked-bike',
  'Commuter': 'naked-bike',
  'Scrambler': 'dirt-bike',
  'Off-Road': 'dirt-bike',
  'Motocross': 'dirt-bike'
};

const processedData = combinedData.map((bike, index) => {
  return {
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    category: typeToCategory[bike.type] || 'naked-bike',
    price: bike.price || Math.floor(Math.random() * 15000) + 5000,
    stock: Math.floor(Math.random() * 20) + 1,
    description: bike.description,
    specifications: {
      engine: `${bike.engine_cc}cc`,
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop",
        alt: bike.name
      }
    ],
    featured: index < 10,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    reviews: []
  };
});

const fileContent = `export const getMotorcycleSeedData = () => ${JSON.stringify(processedData, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'motorcycleSeedData.js'), fileContent, 'utf8');
console.log(`Successfully generated motorcycleSeedData.js with ${combinedData.length} items`);
