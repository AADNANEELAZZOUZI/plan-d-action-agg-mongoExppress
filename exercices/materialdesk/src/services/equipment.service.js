import * as repo from '../repositories/equipment.repository.js';
import { HttpError } from '../errors/http-error.js';

export const listEquipments = (category) => repo.findActive(category ? { category } : {});

export async function getStats() {
  return { count: await repo.countActive() };
}

export async function getEquipment(id) {
  const equipment = await repo.findById(id);
  if (!equipment || equipment.isArchived) throw new HttpError(404, 'Équipement introuvable'); // archivé = invisible
  return equipment;
}

export async function createEquipment(data) {
  // Le serveur impose isArchived et checkoutCount, jamais le client
  const doc = {
    assetTag: data.assetTag,
    name: data.name,
    category: data.category,
    dailyLateFeeCents: data.dailyLateFeeCents,
    isArchived: false,
    checkoutCount: 0
  };
  const created = await repo.create(doc);
  return created.toObject();
}

async function explainMissing(id) {
  const existing = await repo.findById(id);
  if (!existing) throw new HttpError(404, 'Équipement introuvable');
  throw new HttpError(409, 'Équipement archivé : modification interdite');
}

export async function updateEquipment(id, data) {
  const updated = await repo.updateActiveById(id, data);
  return updated ?? explainMissing(id);
}

export async function checkout(id) {
  const updated = await repo.incrementCheckout(id);
  return updated ?? explainMissing(id);
}