const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validation = require("../middlewares/validator");

let {isValid, isValidName,isValidFullName, isValidEmail, isValidMobile, isBoolean, isValidObjectId, isValidLogoLink } = validation;


// const createColleges = async function (req, res) {
//   try {
//     let data = req.body
//     const dataCreated = await collegeModel.create(data)
//     res.status(201).send({ status: true, data: dataCreated })
//   }
//   catch (err) {
//     return res.status(500).send({ status: false, })
//   }
// }

const createColleges = async function (req, res) {
  try {
    let { name, fullName, logoLink } = req.body;

    if (Object.keys(req.body).length < 1) return res.status(400).send({ msg: "Insert Data : BAD REQUEST" })

  let data = await collegeModel.findOne({name:name})
    if(data){
      return res.status(400).send({ msg: "college name already exists" })
    }
  
    if (!isValid(name)) {
      return res.status(400).send({ msg: "Enter College Name" })
    }
    if (!isValidName(name)) {
      return res.status(400).send({ msg: "name only take alphabets" })
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).send({ msg: "Enter Full Name" })
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).send({ msg: "fullname only take alphabets" })
    }
    
    if (!isValidLogoLink(logoLink)) {
      return res.status(400).send({ msg: "Enter Logo Link" })
    }
    let savedData = await collegeModel.create(req.body);
    
    return res.status(201).send({ status: true, msg: "college details are successfully created", data: savedData })
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


const collegeDetails = async function (req, res) {
  try {

    let collegeName = req.query
    let college = await collegeModel.findOne(collegeName)
    const { _id, name, fullName, logoLink } = college
    const id = _id.toString()
    const interns = await internModel.find({ collegeId: id })
    college.interns = interns
    // college.assign = {
    //     interns:interns
    // }
    //   Object.assign(college,{interns:"interns"})
    // college.interns ="interns"
    return res.status(200).send({ status: true, msg: "List Of The Interns Of This College", data: { name, fullName, logoLink, interns } })
  }
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message })
  }
}


module.exports = { createColleges, collegeDetails }