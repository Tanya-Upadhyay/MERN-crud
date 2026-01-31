const enquiryModel = require("../../models/enquiry.models");

let enquiryInsert = (req,res)=>{
    let {name,email,phone,message} =req.body;
    let enquiry = new enquiryModel({
        name, 
        email,
        phone,
        message
    })
    enquiry.save().then(()=>{
        res.send({status: 1, message:"Data Saved"})
    }).catch((err)=>{
        res.send({status: 0, message:"Error whie saving enquiry", error:err});
    })
}
let enquiryList = async(req,res)=>{
   
        enquiryModel.find().then((enquiries)=>{
            res.send({status:1, enquiries:enquiries});
        }).catch((err)=>{
            res.send({status:0, message:'Error while fetching enquiries', error:err})
        })
    }

let enquiryDelete = async(req,res)=>{
    let {id}= req.params
    let delRes = await enquiryModel.deleteOne({_id:
        id})
    let resObj={
        status: 1,
        msg: "Deleted Successfully",
        delRes: delRes
    }
    res.send(resObj)
}

let enquiryUpdate = async (req, res) => {
    let { id } = req.params
    let { name, email, phone, message } = req.body

    let updateObj = {
        name,
        email,
        phone,
        message
    }

    let updateRes = await enquiryModel.updateOne(
        { _id: id },
        { $set: updateObj }
    )

    res.send({
        status: 1,
        msg: "Updated Successfully",
        updateRes
    })
}


module.exports={enquiryInsert, enquiryList, enquiryDelete,enquiryUpdate}