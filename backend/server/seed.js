// seed.js – populate MongoDB with sample motorcycles
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Motorcycle from './models/Motorcycle.js';
import User from './models/User.js';
import { getMotorcycleSeedData } from './data/motorcycleSeedData.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const motorcycles = getMotorcycleSeedData();

    await Motorcycle.deleteMany({});
    console.log('Existing motorcycles cleared');

    await Motorcycle.insertMany(motorcycles);
    console.log(`Seed data inserted: ${motorcycles.length} motorcycles`);

    const adminEmail = 'admin@motorhub.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'MotorHub',
        role: 'admin',
      });
      console.log('Admin user created: admin@motorhub.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
