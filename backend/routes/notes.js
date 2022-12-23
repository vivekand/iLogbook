const express = require('express');
const router =express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes : GET "/api/notes/fetchallnotes"    
router.get('/fetchallnotes', fetchuser, async (req,res)=>{

    try {
        
    
    const notes= await Notes.find({user:req.user.id})
    res.json(notes);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})
// ROUTE 2:add a new note using : POST "/api/notes/addnote"    login require
router.post('/addnote', fetchuser,[
    body("title", "Enter a valid email").isLength({ min: 2 }),
    body("description", "Enter a valid name").isLength({ min: 5 }),

  ],
 async (req,res)=>{
    try {
        
   
    const {title,description,tag}= req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // if not true
    }

    const notes=new Notes({
        title,description,tag,user:req.user.id
    })
    const saveNote=await notes.save(); 
    res.json(saveNote);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
})

module.exports=router