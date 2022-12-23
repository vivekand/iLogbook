const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/ilogbook";
mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connected to mongodb succssfully")
    })
}
module.exports=connectToMongo;