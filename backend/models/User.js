const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        require:ture
    },
    email:{
        type:String,
        require:ture,
        unique:true
    },
    password:{
        type:String,
        require:ture
    },
    date:{
        type:date,
        default:date.now
    },
  });
  module.exports=mongoose.model('user',UserSchema)