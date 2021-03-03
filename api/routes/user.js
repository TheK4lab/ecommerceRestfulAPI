const express = require("express");
const router = express.Router();

const userController = require('../controllers/users');


// Probably useless. I use it to retrieve users ids
router.get("/", userController.getUsers);

router.post("/signup", userController.userSignup);

router.post("/login", userController.userLogin);

router.delete("/:userId", userController.deleteUser);

module.exports = router;
