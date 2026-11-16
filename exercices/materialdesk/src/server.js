import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import Equipment from './models/equipment.model.js';

await mongoose.connect(process.env.MONGODB_URI);
await Equipment.init(); // attend la création de l'index unique
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API sur http://localhost:${port}`));