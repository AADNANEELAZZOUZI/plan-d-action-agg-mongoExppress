import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema(
  {
    assetTag: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: ['video', 'audio', 'informatique'], required: true },
    dailyLateFeeCents: { type: Number, required: true, min: 0, validate: Number.isInteger },
    isArchived: { type: Boolean, default: false },
    checkoutCount: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Equipment', equipmentSchema);