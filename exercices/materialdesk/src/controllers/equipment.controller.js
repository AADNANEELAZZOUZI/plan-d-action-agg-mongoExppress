import * as equipmentService from '../services/equipment.service.js';

export async function listEquipments(req, res, next) {
  try {
    res.status(200).json(await equipmentService.listEquipments(req.query.category));
  } catch (err) { next(err); }
}

export async function getStats(req, res, next) {
  try {
    res.status(200).json(await equipmentService.getStats());
  } catch (err) { next(err); }
}

export async function getEquipment(req, res, next) {
  try {
    res.status(200).json(await equipmentService.getEquipment(req.params.id));
  } catch (err) { next(err); }
}

export async function createEquipment(req, res, next) {
  try {
    const equipment = await equipmentService.createEquipment(req.validated);
    res.status(201).json(equipment);
  } catch (err) { next(err); }
}

export async function updateEquipment(req, res, next) {
  try {
    res.status(200).json(await equipmentService.updateEquipment(req.params.id, req.validated));
  } catch (err) { next(err); }
}

export async function checkoutEquipment(req, res, next) {
  try {
    res.status(200).json(await equipmentService.checkout(req.params.id));
  } catch (err) { next(err); }
}