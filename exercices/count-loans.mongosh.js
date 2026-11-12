print("Loans : " + db.loans.countDocuments());
printjson(db.loans.findOne({ _id: "TEST-2" }));