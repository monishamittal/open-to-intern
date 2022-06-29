const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validation = require("../middlewares/validator");

let { isValid, isValidName, isValidFullName,  isValidLogoLink } = validation;

const createColleges = async function (req, res) {
  try {
    let { name, fullName, logoLink } = req.body;

    if (Object.keys(req.body).length < 1) return res.status(400).send({ status:false, msg: "Insert Data : BAD REQUEST" })

    let data = await collegeModel.findOne({ name: name })
    if (data) {
      return res.status(400).send({ status:false, msg: "college name already exists" })
    }

    if (!isValid(name)) {
      return res.status(400).send({ status:false, msg: "Enter College Name" })
    }
    if (!isValidName(name)) {
      return res.status(400).send({ status:false, msg: "name only take alphabets" })
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).send({ status:false, msg: "Enter Full Name" })
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).send({ status:false, msg: "fullname only take alphabets" })
    }

    if (!isValidLogoLink(logoLink)) {
      return res.status(400).send({ status:false, msg: "Enter Logo Link" })
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
    if (!collegeName.name){
      return res.status(400).send({ status:false, msg: "Provide The College Name" })
    }

    let college = await collegeModel.findOne(collegeName)
    if (!college) {
      return res.status(404).send({status:false, msg: "No College Found" })
    }

    const { _id, name, fullName, logoLink } = college
    const id = _id.toString()
    let interns = await internModel.find({ collegeId: id })

    if (interns.length == 0) {
      let noIntern = "This College Doesn't Have Any Intern"
      interns = noIntern
    }
    const values = { _id, name, fullName, logoLink, interns }

    return res.status(200).send({ status: true, msg: "List Of The Interns Of This College", data: { values } })
  }
  catch (err) {
    return res.status(500).send({ status:false, msg: err.message })
  }
}


module.exports = { createColleges, collegeDetails }