const { default: mongoose } = require("mongoose");

const BookSchema=mongoose.Schema(
    {
        name:{
            type:String,
            unique:true,
            required:true,
            min:[3,"Book Name must be of minimum of 3 charcters"],
            max:[30,"Book Name must be of maximum of 30 characters"]
        },
        category:{
            type:String,
            required:true,
            min:[3,"  category be of minimum of 3 charcters"],
            max:[30," category must be of maximum of 30 characters"]
            
        },
        publisher:{
            type:String,

        },
        bookPhoto:{
            type : String ,
        },
        isIssued:{
            type:Boolean,
            default:false
        },
        isIssuedBookuser:{
            type:mongoose.Schema.Types.ObjectId,
           ref:"user"
        },
        issuedDate:{
            type:Date,
            
        },
        returnDate:{
            type:Date,

        },
        late:{
            type:Number,
            default:0
        },
        fine:{
            type:Number,
            default:0
        }
        },
        {timestamps:true});


const BookModel =mongoose.model('Book',BookSchema);

module.exports = BookModel;