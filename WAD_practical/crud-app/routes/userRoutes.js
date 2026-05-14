const express = require("express");
const router = express.Router();
const User = require("../models/User");

// CREATE
router.post("/add", async (req, res) => {
  const user = new User(req.body);
  const data = await user.save();
  res.json(data);
});

// READ
router.get("/all", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// UPDATE
router.put("/update/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// DELETE
router.delete("/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;