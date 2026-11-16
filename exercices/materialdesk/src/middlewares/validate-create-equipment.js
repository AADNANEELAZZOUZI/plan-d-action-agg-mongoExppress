
import { HttpError } from '../errors/http-error.js';

const allowedCategories = ['video', 'audio', 'informatique'];

export function validateCreateEquipment(req, res, next) {
  const { assetTag, name, category, dailyLateFeeCents } = req.body;

  const errors = [];

  if (typeof assetTag !== 'string' || !assetTag.trim()) {
    errors.push('assetTag est obligatoire et doit être une chaîne non vide');
  }

  if (typeof name !== 'string' || !name.trim()) {
    errors.push('name est obligatoire et doit être une chaîne non vide');
  }

  if (!allowedCategories.includes(category)) {
    errors.push('category doit être video, audio ou informatique');
  }

  if (
    typeof dailyLateFeeCents !== 'number' ||
    !Number.isInteger(dailyLateFeeCents) ||
    dailyLateFeeCents < 0
  ) {
    errors.push('dailyLateFeeCents doit être un entier positif ou nul');
  }

  if (errors.length > 0) {
    return next(new HttpError(400, errors.join(', ')));
  }

  req.validated = {
    assetTag: assetTag.trim().toUpperCase(),
    name: name.trim(),
    category,
    dailyLateFeeCents
  };

  next();
}
