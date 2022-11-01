const { User, Thought, reactionSchema } = require("../models");

module.exports = {
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id.toHexString() } },
        { new: true }
      );
      console.log(`Thought created by user: ${user._id}`);
      return res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      // Checks if thought is in the database
      !thought
        ? res
            .status(404)
            .json({ message: "No thought with that ID found" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
   // Delete a thought
   async removeThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      // Check if thought is in database
      if (!thought) {
        res
          .status(404)
          .json({ message: "No thought with that ID found" });
      } else {
        res.json({ message: "Thought removed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      !thought
        ? res
            .status(404)
            .json({ message: "No thought with that ID found!" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      !thought
        ? res.status(404).json({ message: "No thought with that ID found" })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};