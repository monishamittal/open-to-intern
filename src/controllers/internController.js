const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")


const createInterns = async function(req,res){
  try{
        let data = req.body
        // const college = await collegeModel.find(data.name)
        // console.log(college)
        const createIntern = await internModel.create(data)

        res.status(201).send({status:true,msg:"Intern is Succesfully registered",data:createIntern})
        }

catch(err){
        res.status(500).send({status:false,msg:err.message})
}
}

module.exports = {createInterns}