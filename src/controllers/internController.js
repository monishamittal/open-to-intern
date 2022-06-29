const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validation = require("../middlewares/validator");

let { isValid, isValidName, isValidEmail, isValidMobile } = validation;

const createInterns = async function (req, res) {
    try {

        let { name, email, mobile, collegeName } = req.body;

        if (Object.keys(req.body).length < 1) return res.status(400).send({ status: false, msg: "Insert Data : BAD REQUEST" })

        
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
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, msg: "Enter college Name" })
        }
        let cName = await collegeModel.findOne({ name: collegeName })
        if (!cName) {
            return res.status(404).send({ status: false, msg: "No College Found" })
        }

        let data = req.body

        const college = await collegeModel.find({ name: data.collegeName })

        const [dataOfCollege] = college

        const collegeId = dataOfCollege._id.toString()

        if (college) {
            data['collegeId'] = collegeId
        } else {
            res.status(400).send({ status: false, msg: "No id Found With This College Name" })
        }

        const createIntern = await internModel.create(data)
        res.status(201).send({ status: true, msg: "Intern is Succesfully registered", data: createIntern })
    }

    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { createInterns }