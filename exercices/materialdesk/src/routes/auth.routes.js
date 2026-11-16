import { Router } from 'express';
import { z } from 'zod';
import { login } from '../services/auth.service.js';
import { HttpError } from '../errors/http-error.js';

const router = Router();
const schema = z.object({ email: z.string().min(1), password: z.string().min(1) }).strict();

router.post('/login', async (req, res, next) => {
  try {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) throw new HttpError(400, 'Identifiants requis');
    const token = await login(parsed.data.email, parsed.data.password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

export default router;