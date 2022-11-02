const router = require("express").Router();

const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  removeThought,
  createReaction,
  removeReaction,
} = require("../../controllers/thoughtController.js");

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(removeReaction);

module.exports = router;