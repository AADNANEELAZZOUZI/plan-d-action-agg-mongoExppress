import { HttpError } from '../errors/http-error.js';

export function validateId(req, res, next) {
  if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) return next(new HttpError(400, 'Identifiant invalide'));
  next();
}