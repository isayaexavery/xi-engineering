const mongoose = require("mongoose");

const openSchema = new mongoose.Schema({
  openBalance: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },

});

module.exports = mongoose.model("openBalance", openSchema);
