//intoduce express
const express = require("express");
//access router function in express
const router = express.Router();
//introducing the model.
const procurementModel = require("../models/ProcureModel");
//create the router
router.get("/Procurement", (req, res) => {
  res.render("procureform"); //render a file
});

//posting route
router.post("/Procurement", async (req, res) => {
  try {
    const Proc = new procurementModel(req.body);
    await Proc.save();
    console.log(req.body);
    res.redirect("/ProcurementList");
  } catch (error) {
    console.log(error);
  }
});


//fetching All Dolls from database
router.get("/ProcurementList", async (req, res) => {
  try {
    let items = await procurementModel.find().sort({ $natural: -1 }); //from line8
    res.render("procureTable", { items: items }); // to display sitters from data base
    console.log("display Items", items);
  } catch (error) {
    res.status(400).send("unable to find items from database!");
    console.log("unable to find items from database!...", error);
  }
});

// exportation (always the last line)
module.exports = router;
