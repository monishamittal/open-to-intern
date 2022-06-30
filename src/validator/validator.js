const mongoose = require('mongoose')

//Name Validation
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]+$/
    return nameRegex.test(name)
}


//fullName Validation
const isValidFullName = function (fullName) {
    const fullNameRegex = /\w+([, ]+\w+){1,2}/

    return fullNameRegex.test(fullName)
}


//Email Validation 
const isValidEmail = function (email) {
    const emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
    return emailRegex.test(email)
}


//Mobile Validation
const isValidMobile = function (mobile) {
    const mobileRegex = /^[0-9]{10}$/
    return mobileRegex.test(mobile)
}



// //Boolean Validation
// const isBoolean = function (value) {
//     if (value === true || value === false) return true
//     return false

// }


//Logolink Validation
const isValidLogoLink = function (logolink) {
    const logolinkRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return logolinkRegex.test(logolink)
}


//Value Validation
const isEmpty = function(value){
    if(typeof value ==='undefined' || value ===null)  return false
    if(typeof value ==='string' && value.trim().length ===0)return false
    return true
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
