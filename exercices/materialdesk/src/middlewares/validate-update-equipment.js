
import { HttpError } from '../errors/http-error.js';

const allowedCategories = ['video', 'audio', 'informatique'];

export function validateUpdateEquipment(req, res, next) {
  const { assetTag, name, category, dailyLateFeeCents } = req.body;

  const errors = [];
  const validated = {};

  if (Object.keys(req.body).length === 0) {
    return next(new HttpError(400, 'Le body ne peut pas être vide'));
  }

  if ('assetTag' in req.body) {
    if (typeof assetTag !== 'string' || !assetTag.trim()) {
      errors.push('assetTag doit être une chaîne non vide');
    } else {
      validated.assetTag = assetTag.trim().toUpperCase();
    }
  }

  if ('name' in req.body) {
    if (typeof name !== 'string' || !name.trim()) {
      errors.push('name doit être une chaîne non vide');
    } else {
      validated.name = name.trim();
    }
  }

  if ('category' in req.body) {
    if (!allowedCategories.includes(category)) {
      errors.push('category doit être video, audio ou informatique');
    } else {
      validated.category = category;
    }
  }

  if ('dailyLateFeeCents' in req.body) {
    if (
      typeof dailyLateFeeCents !== 'number' ||
      !Number.isInteger(dailyLateFeeCents) ||
      dailyLateFeeCents < 0
    ) {
      errors.push('dailyLateFeeCents doit être un entier positif ou nul');
    } else {
      validated.dailyLateFeeCents = dailyLateFeeCents;
    }
  }

  const allowedFields = [
    'assetTag',
    'name',
    'category',
    'dailyLateFeeCents'
  ];

  const unknownFields = Object.keys(req.body).filter(
    field => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    errors.push(`Champs interdits: ${unknownFields.join(', ')}`);
  }

  if (errors.length > 0) {
    return next(new HttpError(400, errors.join(', ')));
  }

  req.validated = validated;

  next();
}
