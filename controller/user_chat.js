const user_model=require('../model/model_user')
const chat_model=require('../model/model_chat')
const { Op } = require("sequelize")
function IsStringInvalid(str)
{
    if(str==undefined||str.length===0)
    {
        return true
    }
    else
    {
        return false
    }
}
exports.chat=async(req,res)=>{
    try{
    const message=req.body.message
    if(IsStringInvalid(message))
    {
        return res.status(401).json({message:"something missing"})
    }
   const data=await req.user.createChat({
    message
   })
   const name=req.user.name
   
    res.status(201).json({userdata:{data,name}})
   }catch{
    res.status(501).json({message:"something went wrong"})
   }
}
exports.getchat=async(req,res)=>{
    try{
      const a=req.query.id
      console.log(req.query.id)
    const user_chat=await chat_model.findAll({
      attributes:['id','message'],
      where:{
        id: {[Op.gt]: a}
      },
      include:[
        {
          model:user_model,
          attributes:['name']
          
        }
      ],

    })
    console.log(user_chat)
    res.status(200).json({chat_data:user_chat})
   }catch{
    res.status(404).json({message:"data not found"})
   }
}