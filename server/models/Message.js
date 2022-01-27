const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String
    },
    username:{
        type:String
    }
})

module.exports=mongoose.model("message",messageSchema);