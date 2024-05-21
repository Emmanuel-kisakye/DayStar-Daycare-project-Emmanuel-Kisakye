//intoduce express
const express = require("express");
//access router function in express
const router = express.Router();
//getting the admin pug as the landing page
router.get("/", (req, res) => {
    res.render("AdminDashboard")
});

module.exports = router;