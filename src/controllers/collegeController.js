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
            let college = await collegeModel.findOne(collegeName)
            const{_id,name,fullName,logoLink} = college
            const id = _id.toString()
            const interns = await internModel.find({collegeId:id})
            college.interns =interns
            // college.assign = {
            //     interns:interns
            // }
            //   Object.assign(college,{interns:"interns"})
            // college.interns ="interns"
            return res.status(200).send({status:true,msg:"List Of The Interns Of This College",data:{name,fullName,logoLink,interns}})
    }
    catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
}


module.exports = {createColleges,collegeDetails}