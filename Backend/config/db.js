const mongoose=require("mongoose");

const dbUrl=process.env.DB_URL;

const ConnectDB =async ()=>{
    try{
        mongoose.connect(dbUrl,
            {useNewUrlParser:true ,
                 useUnifiedTopology : true});
        console.log("MongoDb Connected....")
}
catch (err){
    console.log(`Error in connecting to db ${err}`);

    
    };
    };

module.exports = ConnectDB;

