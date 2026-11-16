import { HttpError } from '../errors/http-error.js';

export function notFound(req, res, next) {
  next(new HttpError(404, 'Route introuvable'));
}

export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { message: err.message, details: err.details } });
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { message: 'JSON invalide' } });
  }
  if (err?.code === 11000) {
    return res.status(409).json({ error: { message: 'Doublon : cette valeur existe déjà' } });
  }
  if (err?.name === 'ValidationError' || err?.name === 'CastError') {
    return res.status(400).json({ error: { message: 'Données invalides' } });
  }
  console.error(err);
  res.status(500).json({ error: { message: 'Erreur interne' } }); // jamais de stack au client
}