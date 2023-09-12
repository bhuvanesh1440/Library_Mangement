const express=require("express");
const globalRequestValidation =require("../middlewares/validation")

const validator =require('../validations/user.validation');
const userController =require('../controllers/user.controller');
const router = express.Router();

//get section o
 router.post('/signup',globalRequestValidation(validator.signupvalidator),userController.signup);
// router.post('/signup',userController.signup);
router.post('/signin',globalRequestValidation(validator.signInValidator),userController.signin);

router.get('/',(req,res) =>{
    res.send("User Routes");
})



module.exports=router;