import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Account', accountSchema);