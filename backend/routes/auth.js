const express = require('express');
const router =express.Router()
const User= require('../models/User')
const { body, validationResult } = require('express-validator'); // this is for user information validation
// Create a Usser using : POST "/api/auth/" doesn't require Auth 

router.post('/',[
    body('email','Enter a valid email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 2 }),
    body('password','Password shoud be min 5 characters').isLength({ min: 5 })

],(req,res)=>{  // this a endpoint
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // if not true
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user)).catch(err=> {console.log(err); res.json({error:'please enter a unique email',message:err.message})});
   
})

module.exports=router