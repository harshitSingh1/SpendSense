import 'dotenv/config';
import dbConnect from './lib/mongodb.js';
import Tool from './lib/models/Tool.js';
import { SEED_TOOLS } from './lib/data/seedTools.js';

async function run() {
  await dbConnect();
  await Tool.deleteMany({});
  const baseTools = SEED_TOOLS.map(t => ({
    ...t,
    upvotes: Math.floor(Math.random() * 500) + 100
  }));
  await Tool.insertMany(baseTools);
  console.log('Seeded completely!');
  process.exit(0);
}

run();
