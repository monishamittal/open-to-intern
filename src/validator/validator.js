const mongoose = require('mongoose')

//Name Validation
const isValidName = function (name) {
   try{
        const nameRegex = /^[a-zA-Z ]+$/
        return nameRegex.test(name)
   }
    catch(err){
       return res.status(500).send({status:false,msg:err.message})
    } 
}


//fullName Validation
const isValidFullName = function (fullName) {
    try{
        const fullNameRegex = /\w+([, ]+\w+){1,2}/
        return fullNameRegex.test(fullName)
    }
    catch(err){
       return res.status(500).send({status:false,msg:err.message})
    } 
}


//Email Validation 
const isValidEmail = function (email) {
    try{
        const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
        return emailRegex.test(email)
    }
    catch(err){
       return  res.status(500).send({status:false,msg:err.message})
    } 
}


//Mobile Validation
const isValidMobile = function (mobile) {
    try{
        const mobileRegex = /^[0-9]{10}$/
        return mobileRegex.test(mobile)
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    } 
}



// //Boolean Validation
// const isBoolean = function (value) {
//     if (value === true || value === false) return true
//     return false

// }


//Logolink Validation
const isValidLogoLink = function (logolink) {
    try{
        const logolinkRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        return logolinkRegex.test(logolink)
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    } 
}


//Value Validation
const isEmpty = function(value){
    try{
        if(typeof value ==='undefined' || value ===null)  return false
        if(typeof value ==='string' && value.trim().length ===0)return false
        return true
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    } 
}



module.exports = {
    isEmpty,
    isValidName,
    isValidFullName,
    isValidEmail,
    isValidMobile,
    // isBoolean,
    isValidLogoLink
}
