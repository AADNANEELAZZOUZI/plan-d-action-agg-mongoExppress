
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

import Account from './src/models/account.model.js';

async function main() {

    await mongoose.connect(process.env.MONGODB_URI);

  const email = 'member@test.com';
  const password = 'Password123';

  const existing = await Account.findOne({ email });

  if (existing) {
    console.log('Account already exists');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await Account.create({
    email,
    passwordHash,
    role: 'member'
  });

  console.log('Account created successfully');
}

main()
  .catch(console.error)
  .finally(async () => {
    await mongoose.disconnect();
  });
