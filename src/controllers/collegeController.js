const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validation = require("../validator/validator");

let { isEmpty, isValidName, isValidFullName, isValidLogoLink } = validation;          //Destructing Validation Functions


//==================================================Creating College Data================================================

const createColleges = async function (req, res) {
  try {
        let data = req.body
        let { name, fullName, logoLink } = data;

        // Validating Requested Data Of User      

        if (Object.keys(data).length < 1) return res.status(400).send({ status: false, msg: "Insert Data : BAD REQUEST" })

        let lowerCase = name.toLowerCase() 
        let nameUnSpaced = lowerCase.replace(/\s+/g, "") 
        let checkCollege = await collegeModel.findOne({ name: nameUnSpaced })
        if (checkCollege) {
          return res.status(400).send({ status: false, msg: "college name already exists" })
        }
        if (!isEmpty(name)) {
          return res.status(400).send({ status: false, msg: "Enter College Name" })
        }
        if (!isValidName(name)) {
          return res.status(400).send({ status: false, msg: "name only take alphabets" })
        }
        if (!isValidFullName(fullName)) {
          return res.status(400).send({ status: false, msg: "Enter Full Name" })
        }
        if (!isValidFullName(fullName)) {
          return res.status(400).send({ status: false, msg: "fullname only take alphabets" })
        }
        if (!isValidLogoLink(logoLink)) {
          return res.status(400).send({ status: false, msg: "Enter Logo Link" })
        }

    // Creating College Data After Validations

        let fullNameSpaced = data.fullName.replace(/\s+/g, " ")              //Removing Spaces From College Full Name
        data['fullName'] = fullNameSpaced
        data['name'] = nameUnSpaced
        let savedData = await collegeModel.create(data);

        return res.status(201).send({ status: true, msg: "college details are successfully created", data: savedData })
  } 
  catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
  }
}


//===================================Getting College Details AlongWith Intern's Details=================================

const collegeDetails = async function (req, res) {
  try {
        let collegeName = req.query

        if (!collegeName.name) {
          return res.status(400).send({ status: false, msg: "Provide The College Name" })
        }

        let collegeToLowerCase = collegeName.name.toLowerCase()
        collegeToLowerCase = collegeToLowerCase.replace(/\s+/g, "") 
        let collegefound = await collegeModel.findOne({ name: collegeToLowerCase })       //Finding College Data
        
        if (!collegefound) {
          return res.status(404).send({ status: false, msg: "No College Found" })
        }

        const { _id, name, fullName, logoLink } = collegefound
        const id = _id.toString()
        const data = { _id: 1, name: 1, email: 1, mobile: 1, collegeId: 1 }
        let interns = await internModel.find({ collegeId: id }).select(data)          //FInding Interns Details
        
        if (interns.length == 0) {
          let noIntern = "This College Doesn't Have Any Intern"
          interns = noIntern
        }

        const College = { name, fullName, logoLink, interns }
        return res.status(200).send({ status: true, msg: "List Of The Interns Of This College", data: { College } })  //Giving Respose 
  }
  catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
  }
}


module.exports = { createColleges, collegeDetails }