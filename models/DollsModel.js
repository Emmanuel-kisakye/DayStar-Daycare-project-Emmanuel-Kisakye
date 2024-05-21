//introducing mongoose to the model
const mongoose = require("mongoose");
//access schema function in mongoose
const Schema = mongoose.Schema;
//using function to build schema
const dollsSchema = new Schema({
  dollname: { type: String, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("doll", dollsSchema);