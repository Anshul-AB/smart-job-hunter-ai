const mongoose = require('mongoose')
require('dotenv').config()

const conn = async()=>{
try{
   const connDB = await mongoose.connect(process.env.MONGODB_STR);
    console.log(`MongoDB Connected: ${connDB.connection.host}`)
}catch(err){
     console.error("Database connection error:", err);
    process.exit(1);
}
}
module.exports= conn