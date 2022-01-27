const express=require('express');
const app=express();
require('dotenv').config({path:'config.env'});
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const morgan=require('morgan');
const Message=require('./models/Message');
const Chat=require('./models/Chat');
require('./db/conn');

app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}));

app.use(cors());
app.use(morgan("dev"));

const port=process.env.PORT || 8000;

//User's routes
app.use('/api/public',require('./routes/public'));
app.use('/api/private',require('./routes/private'));


const server=app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
})

const io=require('socket.io')(server);

io.on("connection",(socket)=>{
    console.log("Connected to socket!");
    socket.on('joined',({userId,roomId})=>{
        // console.log(roomId);
        socket.join(roomId);
    })
    socket.on("sendmessage",async({userId,roomId,message})=>{
        const chat=await Chat.findOneAndUpdate({_id:roomId},{
            $push:{
                allMessages:{senderId:userId,message}
            }
        },{new:true})
        console.log(userId);
        // const messages=await Message.find(,);
        // socket.to().emit("sendallmessages",{allMessages:chat.allMessages});
        io.to(roomId).emit("sendallmessages",{allMessages:chat.allMessages});
    })
})