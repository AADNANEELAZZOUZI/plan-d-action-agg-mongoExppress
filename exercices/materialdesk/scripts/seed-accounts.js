import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Account from '../src/models/account.model.js';

await mongoose.connect(process.env.MONGODB_URI);
for (const [email, password, role] of [
  [process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, 'admin'],
  [process.env.MEMBER_EMAIL, process.env.MEMBER_PASSWORD, 'member']
]) {
  if (!email || !password) throw new Error('Renseigne les emails et mots de passe dans .env');
  await Account.findOneAndUpdate(
    { email: email.toLowerCase() },
    { email, role, passwordHash: await bcrypt.hash(password, 10) },
    { upsert: true }
  );
}
console.log('Comptes admin et member prêts');
await mongoose.disconnect();