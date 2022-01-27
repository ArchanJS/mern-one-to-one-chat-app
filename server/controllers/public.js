const User = require("../models/User");
const Chat=require('../models/Chat');

//Login || Register
exports.login=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            res.status(200).send(user._id);
        }
        else{
            user=new User({username,email,password});
            await user.save();
            res.status(201).send(user._id);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}

//create chat
exports.createChat=async(req,res)=>{
    try {
        const {user1,user2}=req.body;
        let chat=await Chat.findOne({userIds:{$all:[user1,user2]}});
        if(!chat) {
            chat=new Chat({userIds:[user1,user2]});
            await chat.save();
        }
        if(chat) res.status(201).send(chat._id);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Something went wrong!"});
    }
}