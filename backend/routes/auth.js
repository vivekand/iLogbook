const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // this is for user information validation

// Create a Usser using : POST "/api/auth/createuser" doesn't require Auth

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("password", "Password shoud be min 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // this a endpoint
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // if not true
    }

    try {
      // check whether the email exist already
      let user = await User.findOne({ email: req.body.email });
    //   console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      // creat a new user that will added to database.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
