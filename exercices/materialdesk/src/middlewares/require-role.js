import { HttpError } from '../errors/http-error.js';

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return next(new HttpError(401, 'Authentification requise'));
    if (!allowedRoles.includes(req.user.role)) return next(new HttpError(403, 'Accès refusé'));
    next(); // chemin autorisé : on continue
  };
}