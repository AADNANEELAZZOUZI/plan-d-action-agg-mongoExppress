import jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http-error.js';

export function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) return next(new HttpError(401, 'Authentification requise'));
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = { id: payload.sub, role: payload.role }; // seule source d'identité
    next();
  } catch {
    next(new HttpError(401, 'Jeton invalide ou expiré'));
  }
}