// Depenecies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // for pug

require("dotenv").config();

const multer = require("multer");

//importing Routes
const ContactRoutes = require("./routes/SitterReg");
const babiesRoutes = require("./routes/BabyReg");
const dollsRoutes = require("./routes/DollsRoute");
const LandingRoute = require("./routes/AdminDash");
const procurementRoute = require("./routes/ProcureRoute")

//instantiations
const app = express();

// configurations
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage: storage });
//Connecting to mongodb
mongoose.connect("mongodb://localhost:27017/Daystar");
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", (err) => {
    console.error(`Connection error: ${err.message}`);
  });
const data = ["log_in"];

app.set("view engine", "pug"); //setting pug as view engine
app.set("views", path.join(__dirname, "views")); //sstting source in viwe folder

//middleweare
app.use(express.static(path.join(__dirname, "public"))); //set directory for static files
app.use(express.urlencoded({ extended: true })); //helps post data in terminal
app.use(express.json());

//routes
//use imported routes
app.use("/", ContactRoutes);
app.use("/", babiesRoutes);
app.use("/", dollsRoutes);
app.use("/", LandingRoute);
app.use("/", procurementRoute);

// for invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an Invalid URL");
});

// bootstrapping server
// always the last line of your code
app.listen(3000, () => console.log("Listening on port 3000"));
