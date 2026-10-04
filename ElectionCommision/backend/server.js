const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { once } = require("node:events");

const electionRoutes = require("./routes/electionRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/elections", electionRoutes);

app.get("/", (req, res) => {
    res.send("VoteSphere Election Commision API is Running");
});

app.listen(PORT,()=>{
    console.log(`Server is up and Running on port ${PORT}`);
})

