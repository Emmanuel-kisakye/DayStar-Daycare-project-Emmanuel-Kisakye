//introducing mongoose to the model
const mongoose = require("mongoose");
//access schema function in mongoose
const Schema = mongoose.Schema;
//using function to build schema
const ProcureSchema = new Schema({
  item: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  Person: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Procurement", ProcureSchema);