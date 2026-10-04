const express = require("express");
const router = express.Router();
const {getElections} = require("../controllers/electionController")

router.get("/", getElections);



module.exports = router;