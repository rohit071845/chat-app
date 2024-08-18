const Messages= require("../model/messageModel");

module.exports.addMessage=async(req,res,next)=>{
try{
    const {from,to,message}=req.body;
    const data=await Messages.create({
        message:{text:message},
          from:from,
          to:to,
        sender:from,
    });
    console.log("fuckedjvervbojqrg",data);
    if(data) return res.json({msg:"Message added successfully."});
   else return res.json({msg:"Failed to add message to the database"});

}
catch(ex){
    next(ex);
}
};


module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log("Request from:", from, "to:", to);

    //     const messages = await Messages.find({
    //         users: {
    //             $all: [from, to],
    //         },
    //     }).sort({ updatedAt: 1 });
     
    //    console.log(messages);
   
    const messages = await Messages.find({
        $or: [
            { from: from, to: to },
            { from: to, to: from }
        ]
    }).sort({ updatedAt: 1 });

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });

        console.log("Projected Messages:", projectMessages);

        res.json(projectMessages);
    } catch (ex) {
        next(ex);
    }
};
// module.exports.getAllMessage=async(req,res,next)=>{
//     try{
//          const {from ,to}=req.body;
//          const messages=await Messages.find({
//             users:{
//                 $all:[from,to],
//             },
//          })
//          .sort({updatedAt:1});
//          const projectMessages=messages.map((msg)=>{
//             return {
//            fromSelf:msg.sender.toString()===from,
//            message:msg.message.text,
//             };
//          });
//          res.json(projectMessages);

//     }catch(ex){
//         next(ex);
//     }
// };