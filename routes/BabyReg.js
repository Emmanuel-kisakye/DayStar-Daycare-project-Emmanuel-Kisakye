//intoduce express
const express = require("express");
//access router function in express
const router = express.Router();
//introducing the model.
const BabyModel = require("../models/RegBaby");
//create the router
router.get("/baby", (req, res) => {
  res.render("RegiBaby"); //render a file (render is always in .get)
});

//posting route
router.post("/baby", async (req, res) => {
  try {
    const student = new BabyModel(req.body);
    console.log(student);
    await student.save();
    res.redirect("/BabyList"); // redirect is always in the post.
  } catch (error) {
    res.status(400).send("something went wrong try again");
    console.log("Error submitting appication", error);
  }
});

//fetching All babies from database
router.get("/BabyList", async (req, res) => {
  try {
    let babies = await BabyModel.find(); //from line8
    res.render("babyTable", { babies: babies }); // to display babies from data base
  } catch (error) {
    res.status(400).send("unable to find babies from database!");
    console.log("unable to find babies from database!...", error);
  }
});
//route to checkIn babies form in database
router.get('/BabyCheckIn/:id', async (req, res) => {
  try {
    const Babycheckin = await BabyModel.findOne({ _id: req.params.id});
    res.render("BabyCheckinform", { baby: Babycheckin });
  } catch (error) {
    console.log("error finding a baby!", error);
    res.status(400).send("unable to find baby from the db!");
  }
});
//
router.post("/BabyCheckIn", async (req, res) => {
  try {
    await BabyModel.findOneAndUpdate({ _id: req.query.id }, req.body); // {avaible: true}
    console.log(req.body);
    res.redirect("/BabyPresentTable"); // redirects to the checkedIn Table
  } catch (error) {
    res.status(404).send("unable to update baby in the db!");
    console.log("........................", error);
  }
});

//fetching list babies Who checkedIn from database
router.get("/BabyPresentTable", async (req, res) => {
  try {
    let babies = await BabyModel.find({ status: "CheckedIn" });
    res.render("BabyPresentTable", {
      //render Table of CheckedIn
      babies: babies,
    }); // to display babies from data base
    console.log("display babies CheckdIn", babies);
  } catch (error) {
    res.status(400).send("unable to find babies from database!");
    console.log("unable to find babies from database!...", error);
  }
});

//delete route for each  sitter form in database
router.post("/deletebaby", async (req, res) => {
  try {
    await BabyModel.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (error) {
    res.status(400).send("unable to delete babies from db!");
    console.log("error deleting babies...", error);
  }
});

// exportation (always the last line)
module.exports = router;
