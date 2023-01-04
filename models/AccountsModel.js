const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema({
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  reference: { type: String, required: true },
  transaction: { type: String, required: true },
});

module.exports = mongoose.model("accounts", accountsSchema);
