const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/votingDB")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("MongoDB Error ❌:", err));

// Schema
const VoteSchema = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model("Vote", VoteSchema);

// Test route
app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// Vote API
app.post("/vote", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    if (!req.body.candidate) {
      return res.status(400).send("Candidate missing ❌");
    }

    const vote = await Vote.create({
      candidate: req.body.candidate,
    });

    console.log("Saved in DB:", vote);

    res.send("Vote saved successfully ✅");
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Server error ❌");
  }
});

// Results API
app.get("/results", async (req, res) => {
  try {
    const data = await Vote.find();
    res.json(data);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send("Error fetching data ❌");
  }
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});