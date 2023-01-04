const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model("expenseType", expenseSchema);
