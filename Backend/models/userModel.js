const { default: mongoose } = require("mongoose");

const userSchema =mongoose.Schema({
    name:{
        type : String,
        minLength:[3,"Name must be atleast of 3 characters long"],
        maxLength:[30,"Name must not be more than 30 characters"],
        required:[true,"Please enter your Name"]
        },
        email:{
            type:String,
            required:true,
            unique: true 
         },
         password:{
            type:String ,
            required:true
        },
        phone:{
            type:String,
            required:true,
            unique:true,
            min:[13, "Phone number must be 13 characters Ex:+911234567890"],
            max:[13, "Phone number must be 13 characters Ex:+911234567890"]
        },
        isVerified:{
            type:Boolean,
            default:false
        },
        resetToken:{
            type:String,
        },
        issuedBooks:{
            type:Array,
            default:[]
            
        }
},{ timestamps: true});


const userModel =mongoose.model('User',userSchema);

module.exports =userModel;