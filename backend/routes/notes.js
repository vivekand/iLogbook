const express = require('express');
const router =express.Router();
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

  // notes adding into database....
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

// ROUTE 3: Update existing note using : PUT "/api/notes/update/id:"    login require
 router.put('/update/:id', fetchuser,async (req,res)=>{

    try {
    const {title,description,tag}= req.body;
    
    const newNotes={}
    if(title){newNotes.title=title};
    if(description){newNotes.description=description};
    if(tag){newNotes.tag=tag};
     // find the note to be updated and update it
    let note= await Notes.findById(req.params.id);  // checking notes exist with the given id.

    if(!note){return res.status(404).send("Note found")};

    if(note.user.toString()!=req.user.id){   // for secruity porpuse checking 
        return res.status(401).send("Not allwoed")
    }
    note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
    res.json(note);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
}) 

// ROUTE 4: Delete  note using : DELETE "/api/notes/update/id:"    login require
 router.delete('/delete/:id', fetchuser,async (req,res)=>{

    try {

     // find the note to be deleted and deleted it
    let note= await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Note found")};
    // allow deletion if user this Note
    if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allwoed")
    }

    note= await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success": "node has been deleted", note:note });
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
}) 


module.exports=router