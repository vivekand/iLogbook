const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // this is for user information validation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Whereareyou$going";
const fetchuser = require('../middleware/fetchuser');

// ROUTE 1: Create a Usser using : POST "/api/auth/createuser" doesn't require Auth

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("password", "Password shoud be min 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    // this a endpoint
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() }); // if not true
    }

    try {
      // used , if there is error then dont add data into the databse..
      // check whether the email exist already
      let user = await User.findOne({ email: req.body.email });
      //   console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10); // what does mean by 10 here  // whenever generate responce use await
      const secPass = await bcrypt.hash(req.body.password, salt); // creating hsah..

      // creat a new user that will added to database.
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      //   console.log(jwtData);
      success=true;
      res.json({success, authtoken });
      //   res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a Usser using : POST "/api/auth/login" .  no login required

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // this a endpoint
    // if there are error return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // if not true
    }
    const { email, password } = req.body;
    try {
      let user =await User.findOne({ email });
      if (!user) {
        success=false;
        return res.status(400).json({ success,error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false;
        return res.status(400).json({ success,error: "Please try to login with correct credentials" });
          
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get loggedin user details : POST "/api/auth/getuser" . login required -- we need to send jwt(json web token)


router.post("/getuser",fetchuser,
   
    async (req, res) => {
      try {
        userId=req.user.id;
        const user=await User.findById(userId).select("-password");
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
      
  });

























module.exports = router;
