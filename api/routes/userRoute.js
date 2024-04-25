const express = require("express");
const {
  updateUser,
  userRegistration,
  getUsers,
  getSingleUser,
  searchUser,
  getUserByCurrentDate,
} = require("../controllers/userController");

const router = express.Router();

router.post("/user-registration", userRegistration);

router.get("/all-users", getUsers);

router.get("/single-user/:id", getSingleUser);

// Update User
router.put("/update-user/:id", updateUser);

// Search User
router.post("/search-user", searchUser);

// Get Users by Current Date
router.get('/currentdate-user', getUserByCurrentDate);

module.exports = router;
