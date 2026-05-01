import mongoose from 'mongoose';
import Tool from './models/Tool';
import { SEED_TOOLS } from './data/seedTools';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB...");

  // Clear existing tools
  await Tool.deleteMany({});
  console.log("Cleared existing tools...");

  // Generate a random upvote count between 150 and 800
  const randomUpvotes = () => Math.floor(Math.random() * (800 - 150 + 1)) + 150;

  const newTools = SEED_TOOLS.map(tool => ({
    ...tool,
    upvotes: randomUpvotes()
  }));

  await Tool.insertMany(newTools);
  console.log("Successfully seeded new database data!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding data:");
  console.error(err);
  process.exit(1);
});
