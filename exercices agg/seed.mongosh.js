if (db.getName() !== "pl_aggregations") {
  throw new Error("Base refusée : utiliser pl_aggregations (base locale jetable).");
}

db.members.drop();
db.equipments.drop();
db.loans.drop();
db.maintenance.drop();

db.members.insertMany([
  { _id: "MB-001", fullName: "Amine Benali",   city: "CASABLANCA", active: true },
  { _id: "MB-002", fullName: "Salma Idrissi",  city: "RABAT",      active: true },
  { _id: "MB-003", fullName: "Nadia Alaoui",   city: "CASABLANCA", active: true },
  { _id: "MB-004", fullName: "Yassine Tazi",   city: "FES",        active: false }
]);

db.equipments.insertMany([
  { _id: "EQ-001", assetTag: "PC-01",  name: "Portable Dell",        category: "INFORMATIQUE", archived: false },
  { _id: "EQ-002", assetTag: "CAM-01", name: "Caméra Sony",          category: "VIDEO",        archived: false },
  { _id: "EQ-003", assetTag: "PRJ-01", name: "Vidéoprojecteur",      category: "VIDEO",        archived: false },
  { _id: "EQ-004", assetTag: "MIC-01", name: "Micro-cravate",        category: "AUDIO",        archived: false },
  { _id: "EQ-005", assetTag: "PC-00",  name: "Ancien ordinateur",    category: "INFORMATIQUE", archived: true  },
  { _id: "EQ-006", assetTag: "MIX-01", name: "Table de mixage",      category: "AUDIO",        archived: false }
]);

const d = (s) => new Date(s + "T00:00:00.000Z");

db.loans.insertMany([
  { _id: "L-001", memberId: "MB-002", equipmentId: "EQ-002", status: "RETURNED", startedAt: d("2026-04-02"), returnedAt: d("2026-04-06"), durationDays: 4, feeCents: 8000 },
  { _id: "L-002", memberId: "MB-002", equipmentId: "EQ-003", status: "RETURNED", startedAt: d("2026-04-10"), returnedAt: d("2026-04-14"), durationDays: 4, feeCents: 7000 },
  { _id: "L-003", memberId: "MB-002", equipmentId: "EQ-001", status: "RETURNED", startedAt: d("2026-03-03"), returnedAt: d("2026-03-07"), durationDays: 4, feeCents: 4000 },
  { _id: "L-004", memberId: "MB-001", equipmentId: "EQ-002", status: "RETURNED", startedAt: d("2026-04-15"), returnedAt: d("2026-04-18"), durationDays: 3, feeCents: 5000 },
  { _id: "L-005", memberId: "MB-001", equipmentId: "EQ-003", status: "RETURNED", startedAt: d("2026-03-12"), returnedAt: d("2026-03-14"), durationDays: 2, feeCents: 3000 },
  { _id: "L-006", memberId: "MB-001", equipmentId: "EQ-001", status: "RETURNED", startedAt: d("2026-03-17"), returnedAt: d("2026-03-20"), durationDays: 3, feeCents: 4000 },
  { _id: "L-007", memberId: "MB-001", equipmentId: "EQ-001", status: "RETURNED", startedAt: d("2026-04-20"), returnedAt: d("2026-04-23"), durationDays: 3, feeCents: 2000 },
  { _id: "L-008", memberId: "MB-001", equipmentId: "EQ-004", status: "RETURNED", startedAt: d("2026-04-25"), returnedAt: d("2026-04-27"), durationDays: 2, feeCents: 3000 },
  { _id: "L-009", memberId: "MB-003", equipmentId: "EQ-002", status: "RETURNED", startedAt: d("2026-03-05"), returnedAt: d("2026-03-07"), durationDays: 2, feeCents: 1400 },
  { _id: "L-010", memberId: "MB-003", equipmentId: "EQ-006", status: "RETURNED", startedAt: d("2026-03-24"), returnedAt: d("2026-03-26"), durationDays: 2, feeCents: 1000 },
  { _id: "L-011", memberId: "MB-003", equipmentId: "EQ-005", status: "RETURNED", startedAt: d("2026-02-20"), returnedAt: d("2026-02-23"), durationDays: 3, feeCents: 3000 },
  { _id: "L-012", memberId: "MB-004", equipmentId: "EQ-001", status: "RETURNED", startedAt: d("2026-04-05"), returnedAt: d("2026-04-07"), durationDays: 2, feeCents: 2000 },
  { _id: "L-013", memberId: "MB-004", equipmentId: "EQ-001", status: "ACTIVE",    startedAt: d("2026-05-02"), returnedAt: null,            durationDays: 0, feeCents: 1500 },
  { _id: "L-014", memberId: "MB-002", equipmentId: "EQ-003", status: "CANCELLED", startedAt: d("2026-04-28"), returnedAt: null,            durationDays: 0, feeCents: 0 }
]);

db.maintenance.insertMany([
  { _id: "M-001", equipmentId: "EQ-002", status: "DONE",        performedAt: d("2026-03-10"), costCents: 3000 },
  { _id: "M-002", equipmentId: "EQ-002", status: "DONE",        performedAt: d("2026-04-08"), costCents: 3500 },
  { _id: "M-003", equipmentId: "EQ-003", status: "DONE",        performedAt: d("2026-04-12"), costCents: 3000 },
  { _id: "M-004", equipmentId: "EQ-001", status: "DONE",        performedAt: d("2026-03-20"), costCents: 5000 },
  { _id: "M-005", equipmentId: "EQ-004", status: "DONE",        performedAt: d("2026-04-18"), costCents: 1200 },
  { _id: "M-006", equipmentId: "EQ-005", status: "DONE",        performedAt: d("2026-02-15"), costCents: 2500 },
  { _id: "M-007", equipmentId: "EQ-999", status: "DONE",        performedAt: d("2026-04-22"), costCents: 800  },
  { _id: "M-008", equipmentId: "EQ-002", status: "IN_PROGRESS", performedAt: d("2026-05-03"), costCents: 4000 }
]);

print("Seed chargé : " + db.getName());