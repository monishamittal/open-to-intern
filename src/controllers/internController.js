const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")


const createInterns = async function(req,res){
  try{
        let data = req.body
        const college = await collegeModel.find({name:data.collegeName})           //Getting The College Details
        const [dataOfCollege]= college                                             //Destructing the array 
        const collegeId = dataOfCollege._id.toString()                             //Getting The College Id and Changing into string
        if(college){
            data['collegeId'] = collegeId                                          //adding the value in body's data
        }else{
            res.status(400).send({status:false,msg:"No id Found With This College Name"})
        }
        const createIntern = await internModel.create(data)                     //creating the data in database
        

        res.status(201).send({status:true,msg:"Intern is Succesfully registered",data:createIntern})
        }

catch(err){
        res.status(500).send({status:false,msg:err.message})
}
}

module.exports = {createInterns}