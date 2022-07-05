const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validation = require("../validator/validator");

let { isValid, isValidName, isValidEmail, isValidMobile } = validation;             //Destruction Validator Functions Here

//================================================Intern's Details Creation ============================================

const createInterns = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data;

        //  Validating Requested Data 

        if (Object.keys(data).length < 1) return res.status(400).send({ status: false, msg: "Insert Data : BAD REQUEST" })

        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "Enter Intern Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, msg: "Intern name should be valid" })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: " please enter email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, msg: " please enter valid email" })
        }
        let emailId = await internModel.findOne({ email: email })
        if (emailId) {
            return res.status(400).send({ status: false, msg: "emailId already exists" })
        }

        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, msg: " please enter mobile number" })
        }
        if (!isValidMobile(mobile)) {
            return res.status(400).send({ status: false, msg: " please enter valid mobile Number" })
        }
        let mobileNo = await internModel.findOne({ mobile: mobile })
        if (mobileNo) {
            return res.status(400).send({ status: false, msg: "mobile no already exists" })
        }

        let collegeLowerCase = collegeName.replace(/\s+/g, " ").toLowerCase()
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "Enter college Name" })
        }
        let college = await collegeModel.find({ name: collegeLowerCase })
        if (college.length == 0) {
            return res.status(404).send({ status: false, msg: "No College Found" })
        }

        //     Creating Interns Details Here

        let Name = data.name.replace(/\s+/g, " ")                     //Removing Spaces From Name Of Intern
        data.name = Name
        const collegeId = college._id                                 //Fetching the College's Id 
        data.collegeId = collegeId

        const createIntern = await internModel.create(data)
        res.status(201).send({ status: true, msg: "Intern is Succesfully registered", data: createIntern })
    }

    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createInterns }