const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const userRoute =require("./routes/userRoute");
const messageRoute =require("./routes/messagesRoute");
const app=express();
const socket=require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoute);
app.use("/api/messages",messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
      useUnifiedTopology:true,
}).then(()=>{
    console.log("Database connected successfully");
})
.catch((err)=>{
  console.log(err.message);
});
app.get("/ping",(req,res)=>{
  return res.json({msg:"ping successfully"})
})
const server=app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`);
});
   const io=socket(server,{
    cors:{
      origin:"http://localhost:3000",
      credentials:true,
    },
   });

   global.onlineUsers=new Map();

   io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
      onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
      const sendUserSocket=onlineUsers.get(data.to);
      if(sendUserSocket){
        socket.to(sendUserSocket).emit("msg-recieve",data.msg);
      }
    });
   });