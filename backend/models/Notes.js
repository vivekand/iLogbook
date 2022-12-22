const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title:{
        type:String,
        require:ture
    },
    description:{
        type:String,
        require:ture,
        
    },
    tag:{
        type:String,
        default:"General"
        
    },
    date:{
        type:date,
        default:date.now
    },
  });
  module.exports=mongoose.model('notes',NotesSchema)