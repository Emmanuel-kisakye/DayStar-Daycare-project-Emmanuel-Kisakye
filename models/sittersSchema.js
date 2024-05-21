const { Schema } = require("./RegSitter");
//introducing mongoose to the model
const mongoose = require("mongoose");
//access schema function in mongoose
const Schema = mongoose.Schema;
//using function to build schema
const sittersSchema = new Schema({
  names: { type: String, required: true },
  location: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female',] },
  nextOfKin: { type: String, required: true },
  nin: { type: String, required: true },
  recommenderName: { type: String, required: true },
  religion: { type: String }, // Optional field
  educationLevel: { type: String, required: true },
  sitterNumber: { type: Number, required: true },
  contacts: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true }
}, { timestamps: true });
exports.sittersSchema = sittersSchema;
