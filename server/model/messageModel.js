const mongoose=require("mongoose");
 const messageSchema=new mongoose.Schema({
   message:{
     text:{
        type:String,
        required:true,
     },
   },
   from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true,
},
to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Reference to the User model
    required: true,
},
  //  users:Array,
//   users: [{
//     type: mongoose.Schema.Types.ObjectId,  // Array of ObjectIds
//     ref: "User",  // Reference to the User model
//     required: true,
// }],
   sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
 },
 {
    timestamps:true,
 }
);

 module.exports=mongoose.model("Messages",messageSchema);