import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../models/account.model.js';
import { HttpError } from '../errors/http-error.js';

export async function login(email, password) {
  const account = await Account.findOne({ email: email.toLowerCase() });
  const ok = account && (await bcrypt.compare(password, account.passwordHash));
  if (!ok) throw new HttpError(401, 'Identifiants invalides'); // même message dans les deux cas
  return jwt.sign({ role: account.role }, process.env.JWT_SECRET, {
    subject: String(account._id),
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    algorithm: 'HS256'
  });
}