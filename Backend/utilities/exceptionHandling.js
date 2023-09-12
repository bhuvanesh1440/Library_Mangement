// This will handle the error in the application globally
applicationErrorHandling =(err,req,res,next) => {
    const status =err.status || 400;
    res.status[status].json({
        message: err.message,
        status:status,
        stack: err.stack
    });
}

function catchAsyncError(fn) {
    return (req,res,next) =>{
        fn(req,res,next).catch( (err)=>{
            next(err);
        });
    }
}

module.exports={
    applicationErrorHandling,
    catchAsyncError
}