const bookModel =require("../models/bookModel");
const userModel =require("../models/userModel");

// add a new Book
exports.addBook = async (req,res) =>{
    const {name,category,publisher}=req.body;
    const book =await bookModel.insertMany({name,category,publisher,bookPhoto:req.file.filename});
    res.status(201).json({success:true,message :"Book added successfully"});

}

// get all Books
exports.getAllBooks = async (req,res) =>{
    const books =await bookModel.find().sort({createdAt: -1}); //sort is used to sort based on the timestamp
    res.status(200).json({success:true,data:books});
}