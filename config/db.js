 const mongoose = require('mongoose');

 const config = require('config');

 //to get value from config.json

 const db = config.get('mongoURI');


 const connectDB = async ()=>{
     try{

       await mongoose.connect("mongodb://localhost:27017/Project_Udemy",{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true});
       console.log("Mongodb connected");
     }
     catch(err){
         //EXIT process with failure
         console.error(err.message);
        process.exit(1);
     }
 }

 connectDB();
 //module.exports = connnectDB;