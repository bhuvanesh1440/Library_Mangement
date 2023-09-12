const {schema } =require("mongoose");

const methods =['body' , 'query' , 'params' , 'header']

const globalRequestValidation =(schema) =>{
    return (req,res,next) =>{
        const errorArray=[];

        for (const property in schema) {
            const { error } = schema[property].validate(req[property],{
                abortEarly: false,

            });
            if(errorArray?.details){
                errorArray.details.forEach(error =>{
                    errorArray.push(error.message);
                });
            }
        }

        if(errorArray.length){ //if there are any errors the request will be rejected
            return res.status(400).json({success:false,message:'Failed due to global validation' , errorArray});
        } else {
            next(); // we can proceed further with the request if ther is no error
        };
    };
};

module.exports =globalRequestValidation;