const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "this feild is required"],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, "this feild is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "this feild is required"],
  },
  answer:{
    type:String,
    required:[true, "this feild is required"]
  }
},{
  timestamps:true
});

const authModel=mongoose.model("auth",authSchema)
module.exports=authModel
