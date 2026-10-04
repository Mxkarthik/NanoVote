const express = require("express");
const { testDatabaseConnection } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await testDatabaseConnection();
        return res.status(200).json({ status: "ok", database: "connected" });
    } catch {
        return res.status(503).json({ status: "error", database: "unavailable" });
    }
});

module.exports = router;