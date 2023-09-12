const joi = require('joi');
// const { signup, signin } = require('../controllers/user.controller');

signupvalidator ={
    body: joi.object({
        name :joi.string().min(3).max(20).required(),
        email  : joi.string().email({minDomainSegments: 2,tlds:{ allow: ['com','net']} }).required(),
        phone : joi.string().pattern(new RegExp('^\\[6789][0-9]{9}$')).required(),// +91 123456789 ------>[^\\[6789][0-9]{9}$]
        password :joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*.).{12}$')).required(),  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*.).{12}$
        confirmPassword :joi.ref('password')
    }) 

}

signInValidator = {
    body:joi.object({
        email  : joi.string().email({minDomainSegments: 2,tlds:{ allow: ['com','net']} }).required(),
        password :joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*.).{12}$')).required(),  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*.).{12}$


    })
}

module.exports ={
    signupvalidator ,
    signInValidator
}