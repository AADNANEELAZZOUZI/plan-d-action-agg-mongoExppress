db.loans.insertOne({ _id: "TEST-2", memberId: "MB-001", equipmentId: "EQ-999",
  status: "RETURNED", feeCents: 500, durationDays: 1,
  startedAt: new Date("2026-03-10T00:00:00Z"), returnedAt: new Date("2026-03-11T00:00:00Z") });
print("Insere TEST-2");