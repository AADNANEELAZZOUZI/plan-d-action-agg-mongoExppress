const pipeline = [
  { $match: { status: "RETURNED" } },
  { $lookup: {
      from: "equipments",
      localField: "equipmentId",
      foreignField: "_id",
      as: "equipment"
  }},
  { $unwind: "$equipment" },
  { $match: { "equipment.archived": { $ne: true } } },
  { $group: {
      _id: "$equipment.category",
      loanCount: { $sum: 1 },
      avgDuration: { $avg: "$durationDays" },
      revenueCents: { $sum: "$feeCents" }
  }},
  { $project: {
      _id: 0,
      category: "$_id",
      loanCount: 1,
      averageDurationDays: { $round: ["$avgDuration", 2] },
      revenueCents: 1
  }},
  { $sort: { revenueCents: -1, category: 1 } }
];
printjson(db.loans.aggregate(pipeline).toArray());