const User=require("../model/userModel");
const bcrypt=require("bcrypt");
module.exports.register= async(req,res,next)=>{
    try{
       const {username,email,password}=req.body;
       const usernameCheck=await User.findOne({username});
     if(usernameCheck) 
        return res.json({msg:"Username already exist",status:false});
    const emailCheck=await User.findOne({email});
    if(emailCheck)
        return res.json({msg:"Email already exist",status:false});
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        email,username,password:hashedPassword,
    });
    delete user.password;
    return res.json({status:true,user});
    }
    catch(x){
        next(x);
    }
};

module.exports.login= async(req,res,next)=>{
    try{
       const {username,password}=req.body;
       const user =await User.findOne({username});
     if(!user) 
        return res.json({msg:"Incorrect username or password",status:false});
    const isPasswordValid=await bcrypt.compare(username,user.password);
    if(!isPasswordValid)
        return res.json({msg:"Incorrect username or password",status:false});  
    delete user.password; 
    return res.json({status:true,user});
    }
    catch(x){
        next(x);
    }
}; 

module.exports.setAvatar=async(req,res,next)=>{
   try{
   const userId=req.params.id;
   const avatarImage=req.body.image;
   const userData=await User.findByIdAndUpdate(userId,{
    isAvtarImageSet:true,
    avatarImage,
   });
   return res.json({
    isSet:userData.isAvtarImageSet,
    image:userData.avatarImage,
   });
   }
   catch(ex){
    next(ex);
   }
};


module.exports.getAllUsers=async(req,res,next)=>{
   try{
const users=await User.find({_id:{$ne:req.params.id}}).select([
    "email","username","avatarImage","_id",
]);
return res.json(users);
   }
   catch(ex){
    next(ex);
   }
};

module.exports.logOut=(req,res,next)=>{
    try{
       if(!req.params.id) return res.json({msg:"user id is required"});
       onlineUsers.delete(req.params.id);
       return res.status(200).send();
    }
    catch(ex){
        next(ex);
    }
}