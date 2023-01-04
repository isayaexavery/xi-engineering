const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  used: { type: Boolean}
});

module.exports = mongoose.model("invoiceNumbers", invoiceSchema);
