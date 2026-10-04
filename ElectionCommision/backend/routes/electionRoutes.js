const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.send("Election routes are working")
})

module.exports = router;