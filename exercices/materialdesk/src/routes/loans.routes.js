import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/require-role.js';
import { validateLoansQuery } from '../middlewares/validate-loans-query.js';
import { listReturned } from '../controllers/loan.controller.js';

const router = Router();
router.get('/returned', authenticate, requireRole('admin', 'member'), validateLoansQuery, listReturned);
export default router;