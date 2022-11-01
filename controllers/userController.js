const { User, Thought } = require("../models");

module.exports = {
  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );
      // Check if user is in the database
      !user
        ? res.status(404).json({ message: "No user with that ID" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update an existing user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // Check if a user is in the database
      !user
        ? res.status(404).json({ message: "No user with that ID!" })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },