const router=require('express').Router();
const { login,createChat } = require('../controllers/public');

//login
router.post('/login',login);

//Create char
router.post('/createchat',createChat);

module.exports=router;