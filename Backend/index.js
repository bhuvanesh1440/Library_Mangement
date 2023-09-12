const express=require("express");
const app=express();

require("dotenv").config();
const ConnectDB = require("./config/db")
PORT=process.env.PORT



// config function call
ConnectDB();
app.get('/',(req,res)=>{
    res.send("Hello World!")    
})


// routes
var UserRoutes =require("./routes/user.router");
// const bookRoutes = require("./routes/");

// routes
app.use(express.json());  //middle ware

// user Routes
 app.use('/User',UserRoutes);




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

})