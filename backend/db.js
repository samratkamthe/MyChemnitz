const mongoose=require('mongoose');
// const mongoURI="mongodb://127.0.0.1:27017/ChemnitzDbUser"
require('dotenv').config({ path: './.env' });

const mongoURI=process.env.Chemnitz_Db


const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected to MongoDB successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };
  
module.exports= connectToMongo;