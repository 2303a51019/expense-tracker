const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (FINAL CORRECT)
mongoose.connect("mongodb://127.0.0.1:27017/expense")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// MODEL
const Transaction = mongoose.model("Transaction", {
  title: String,
  amount: Number,
  type: String,
  category: String
});

// ================= ROUTES ================= //

// GET all transactions
app.get("/transactions", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ADD transaction
app.post("/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added");
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE transaction
app.delete("/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.send("Transaction Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});
// ===== BUDGET MODEL =====
const Budget = mongoose.model("Budget", {
  category: String,
  amount: Number
});

// GET budgets
app.get("/budgets", async (req, res) => {
  const data = await Budget.find();
  res.json(data);
});

// ADD budget
app.post("/budgets", async (req, res) => {
  const newBudget = new Budget(req.body);
  await newBudget.save();
  res.send("Budget Added");
});
// DELETE budget
app.delete("/budgets/:id", async (req, res) => {
  await Budget.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});
// ================= SERVER ================= //

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});