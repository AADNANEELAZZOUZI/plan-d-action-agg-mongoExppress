import { HttpError } from '../errors/http-error.js';

export function validateListQuery(req, res, next) {
  const { category } = req.query;
  if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
    return next(new HttpError(400, 'Paramètre category invalide'));
  }
  next();
}