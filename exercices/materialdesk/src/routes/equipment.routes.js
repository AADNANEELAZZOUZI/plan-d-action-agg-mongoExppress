import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { requireRole } from '../middlewares/require-role.js';
import { validateId } from '../middlewares/validate-id.js';
import { validateListQuery } from '../middlewares/validate-list-query.js';
import { validateCreateEquipment } from '../middlewares/validate-create-equipment.js';
import { validateUpdateEquipment } from '../middlewares/validate-update-equipment.js';
import * as controller from '../controllers/equipment.controller.js';

const router = Router();
router.use(authenticate); // 401 avant toute lecture métier

router.get('/', requireRole('admin', 'member'), validateListQuery, controller.listEquipments);
router.get('/stats', requireRole('admin', 'member'), controller.getStats); // AVANT /:id
router.get('/:id', requireRole('admin', 'member'), validateId, controller.getEquipment);

router.post('/', requireRole('admin'), validateCreateEquipment, controller.createEquipment);
router.patch('/:id', requireRole('admin'), validateId, validateUpdateEquipment, controller.updateEquipment);
router.post('/:id/checkouts', requireRole('admin'), validateId, controller.checkoutEquipment);

export default router;