const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

const { jwtsecret } = require('../../utils/config');

// Uncomment if you want to validate with regex
// let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.find();
      if (!users || users.length === 0) {
        console.log("NO USERS FOUNDED! HAVE YOU CREATED ONE AT LEAST?");
        return res
          .status(400)
          .json({ message: "No users founded! Try to create one" });
      }
      console.log("USERS FOUNDED!", users);
      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

exports.userSignup = async (req, res, next) => {
    try {
      const email = req.body.email;
      // We can validate the email address with the regular expressions, like down below
      // if(!emailRegex.test(email)) {
      //     console.log("INVALID EMAIL ADDRESS", email);
      //     return res.status(500).json({message: "Invalid email address", email});
      // };
      // Or we can use 'validator' package
      if (!validator.isEmail(email)) {
        console.log("INVALID EMAIL ADDRESS", email);
        return res.status(500).json({ message: "Invalid email address", email });
      }
      // This returns an array
      const userExist = await User.find({ email });
      if (userExist.length >= 1) {
        console.log("USER ALREADY EXISTS!", userExist);
        return res.status(409).json({ error: "User already exists" });
      }
      const password = await bcrypt.hash(
        req.body.password,
        12,
        async (err, hash) => {
          if (err) {
            return res.status(500).json({ error });
          } else {
            console.log("PASSWORD ENCRYPTED!", password);
            const user = new User({ email, password: hash });
            await user.save();
            console.log("USER CREATED!", user);
            res.status(200).json({ message: "User created", user });
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  } 

exports.userLogin = async (req, res, next) => {
    try {
      // We check if the email address is valid
      const email = req.body.email;
      if (!validator.isEmail(email)) {
        console.log("INVALID EMAIL ADDRESS", email);
        return res.status(500).json({ message: "Invalid email address", email });
      }
      // This returns an array with one element (the user)
      const user = await User.findOne({ email });
      if (!user) {
        console.log("AUTH FAILED");
        return res.status(401).json({ message: "Auth failed" });
      }
      // We compare the hashed password in the database with the one submitted in the form
      const password = await bcrypt.compare(req.body.password, user.password);
      if (!password) {
        console.log("AUTH FAILED");
        return res.status(401).json({ message: "Auth failed" });
      }
      const token = jwt.sign({ id: user._id, email: user.email }, jwtsecret, {expiresIn: "1h"});
      console.log("USER LOGGED IN:", user);
      res.status(200).json({ message: "User logged in", user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }

exports.deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        console.log("UNABLE TO FIND THE USER!");
        return res.status(404).json({ message: "User not found!" });
      }
      console.log("USER DELETED", user);
      res.status(200).json({ message: "User deleted", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }