const router=require('express').Router();
const {protectUser}=require('../middlewares/protect');
const {getOwnDetails}=require('../controllers/private');

//Get own details
router.get('/getdetails',protectUser,getOwnDetails);

module.exports=router;