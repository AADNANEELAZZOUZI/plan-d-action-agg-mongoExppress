import 'dotenv/config';
import fs from 'node:fs';
import mongoose from 'mongoose';
import Equipment from '../src/models/equipment.model.js';

await mongoose.connect(process.env.MONGODB_URI);
await Equipment.init();
await Equipment.deleteMany({});
const [E1, E2, E3] = await Equipment.create([
  { assetTag: 'VID-001', name: 'Vidéoprojecteur', category: 'video', dailyLateFeeCents: 150, isArchived: false },
  { assetTag: 'AUD-001', name: 'Enceinte', category: 'audio', dailyLateFeeCents: 100, isArchived: false },
  { assetTag: 'VID-OLD', name: 'Ancien projecteur', category: 'video', dailyLateFeeCents: 80, isArchived: true }
]);
const ids = { E1: String(E1._id), E2: String(E2._id), E3: String(E3._id) };
fs.writeFileSync('fixtures-ids.json', JSON.stringify(ids, null, 2));
console.log(ids);
await mongoose.disconnect();