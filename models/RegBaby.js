//introducing mongoose to the model
const mongoose = require("mongoose");
//access schema function in mongoose
const Schema = mongoose.Schema;
//using function to build schema
const babySchema = new Schema(
  {
    babyName: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    age: { type: Number, require: true },
    location: { type: String, required: true },
    personBrought: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    parentsNames: { type: String }, // Optional field
    fee: { type: Number, required: true },
    periodOfStay: { type: Number, required: true },
    babyNumber: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Baby", babySchema);
