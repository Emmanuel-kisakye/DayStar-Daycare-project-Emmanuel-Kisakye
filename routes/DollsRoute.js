//intoduce express
const express = require("express");
//access router function in express
const router = express.Router();
//introducing the model.
const dollModel = require("../models/DollsModel");
//create the router
router.get("/Doll", (req, res) => {
  res.render("RegiDoll"); //render a file
});

//posting route
router.post("/Doll", async (req, res) => {
  try {
    const contact = new dollModel(req.body);
    await contact.save();
    console.log(req.body);
    res.redirect("/dollList");
  } catch (error) {
    console.log(error);
  }
});

//fetching All Dolls from database
router.get("/dollList", async (req, res) => {
  try {
    let dolls = await dollModel.find().sort({ $natural: -1 }); //from line8
    res.render("DollTable", { dolls: dolls }); // to display dolls from data base
    console.log("display dolls", dolls);
  } catch (error) {
    res.status(400).send("unable to find dolls from database!");
    console.log("unable to find dolls from database!...", error);
  }
});
//Route to sell dolls
router.get("/dollSold/:id", async (req, res) => {
  try {
    const dolls = await dollModel.findOne({ _id: req.params.id });
    res.render("SellDollsForm", { dolls: dolls });
  } catch (error) {
    console.log("error finding a dolls!", error);
    res.status(400).send("unable to find dolls from the db!");
  }
});

router.post("/dollSold", async (req, res) => {
  try {
    await dollModel.findOneAndUpdate({ _id: req.query.id }, req.body); // {avaible: true}
    console.log(req.body);
    res.redirect("/SoldTable"); // redirects to the checkedIn Table
  } catch (error) {
    res.status(404).send("unable to update dolls in the db!");
    console.log("........................", error);
  }
});
//fetching list dolls Who checkedIn from database
router.get("/SoldTable", async (req, res) => {
  try {
    let doll = await dollModel.find({ status: "CheckedIn" });
    res.render("dollSoldTable", {
      //render Table of CheckedIn
      doll: doll,
    }); // to display dolls from data base
    console.log("display doll sold", doll);
  } catch (error) {
    res.status(400).send("unable to find dolls from database!");
    console.log("unable to find dolls from database!...", error);
  }
});

//delete route for each  sitter form in database
router.post("/deleteDoll", async (req, res) => {
  try {
    await dollModel.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("unable to delete sitter from db!");
    console.log("error deleting sitter...", error);
  }
});

// exportation (always the last line)
module.exports = router;
