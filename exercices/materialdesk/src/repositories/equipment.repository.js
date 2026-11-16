import Equipment from '../models/equipment.model.js';

export const findActive = (filter = {}) =>
  Equipment.find({ isArchived: false, ...filter }).sort({ assetTag: 1 }).lean();

export const countActive = () => Equipment.countDocuments({ isArchived: false });

export const findById = (id) => Equipment.findById(id).lean();

export const create = (data) => Equipment.create(data);

// Les deux mutations excluent l'archivé directement dans le filtre
export const updateActiveById = (id, data) =>
  Equipment.findOneAndUpdate(
    { _id: id, isArchived: false },
    { $set: data },
    { new: true, runValidators: true }
  ).lean();

export const incrementCheckout = (id) =>
  Equipment.findOneAndUpdate(
    { _id: id, isArchived: false },
    { $inc: { checkoutCount: 1 } }, // incrément atomique côté MongoDB
    { new: true }
  ).lean();