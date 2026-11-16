const pipeline = [
  { $match: { status: "RETURNED" } },
  { $group: {
      _id: "$memberId",
      returnedLoanCount: { $sum: 1 },
      revenueCents: { $sum: "$feeCents" }
  }},
  { $project: { _id: 0, memberId: "$_id",
     returnedLoanCount: 1,
     revenueCents: 1 } },
  { $sort: { revenueCents: -1, memberId: 1 } }
];
printjson(db.loans.aggregate(pipeline).toArray());




    