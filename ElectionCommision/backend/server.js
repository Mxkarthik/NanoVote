const express = require("express");
const cors = require("cors");
require("dotenv").config();

const electionRoutes = require("./routes/electionRoutes");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

// Mount election routes
app.use("/elections", electionRoutes);

//GET Method
app.get("/",(req,res) => {
    res.send("VoteSphere Election Commision API is Running");
})

const PORT = process.env.PORT || 5000

app.listen(PORT , () => {
    console.log(`Server is Running on Port ${PORT}`);
});