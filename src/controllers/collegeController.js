const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const createColleges = async function(req,res){
      try{
            let data = req.body
            const dataCreated = await collegeModel.create(data)
            res.status(201).send({status:true, data:dataCreated})
      }
      catch(err){
        return res.status(500).send({status:false,})
      }
}

const collegeDetails = async function(req,res){
    try{
            
            let collegeName = req.query
            const college = await collegeModel.findOne(collegeName)
            // console.log(college)
            const [collegeDetails] = college
            
            const id = collegeDetails._id.toString()
            const interns = await internModel.find({collegeId:id})
              Object.assign(college,{interns:"interns"})
            return res.status(200).send({status:true,msg:"List Of The Interns Of This College",data:college})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


module.exports = {createColleges,collegeDetails}