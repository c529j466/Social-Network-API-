const router = require("express").Router();

const {
  getSingleUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController.js");

// /api/users/:userId
router
  .route("/:userId")
  .get(getSingleUser)
  .put(updateUser)
  .delete(removeUser);

// /api/users
router
  .route("/")
  .get(getUsers)
  .post(createUser);

// /api/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;