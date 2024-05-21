//intoduce express
const express = require("express");
//access router function in express
const router = express.Router();
//introducing the model.
const sitterModel = require("../models/RegSitter");
//create the router
router.get("/sitter", (req, res) => {
  res.render("RegiSitters"); //render a file
});

//posting route
router.post("/sitter", async (req, res) => {
  try {
    const contact = new sitterModel(req.body);
    await contact.save();
    console.log(req.body);
    res.redirect("/sitterList");
  } catch (error) {
    console.log(error);
  }
});

//fetching All Sitters from database
router.get("/sitterList", async (req, res) => {
  try {
    let sitters = await sitterModel.find().sort({ $natural: -1 }); //from line8
    res.render("sitterTable", { sitters: sitters }); // to display sitters from data base
    console.log("display sitters", sitters);
  } catch (error) {
    res.status(400).send("unable to find babies from database!");
    console.log("unable to find babies from database!...", error);
  }
});

//route to register present sitter form in database
router.get("/sitterCheckIn/:id", async (req, res) => {
  try {
    const sitter = await sitterModel.findOne({ _id: req.params.id });
    res.render("PresentSitterform", { sitter: sitter });
  } catch (error) {
    console.log("error finding a Sitter!", error);
    res.status(400).send("unable to find Sitter from the db!");
  }
});

router.post("/sitterCheckIn", async (req, res) => {
  try {
    await sitterModel.findOneAndUpdate({ _id: req.query.id }, req.body); // {avaible: true}
    console.log(req.body);
    res.redirect("/SittersCheckedInList"); // redirects to the checkedIn Table
  } catch (error) {
    res.status(404).send("unable to update Sitter in the db!");
    console.log("........................", error);
  }
});

//fetching list sitters Who checkedIn from database
router.get("/SittersCheckedInList", async (req, res) => {
  try {
    let sitters = await sitterModel.find({ status: "CheckedIn" });
    res.render("presentTable", {
      //render Table of CheckedIn
      sitters: sitters,
    }); // to display sitters from data base
    console.log("display sitter CheckdIn", sitters);
  } catch (error) {
    res.status(400).send("unable to find sitters from database!");
    console.log("unable to find sitters from database!...", error);
  }
});

//delete route for each  sitter form in database
router.post("/deleteSitter", async (req, res) => {
  try {
    await sitterModel.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("unable to delete sitter from db!");
    console.log("error deleting sitter...", error);
  }
});

// exportation (always the last line)
module.exports = router;
