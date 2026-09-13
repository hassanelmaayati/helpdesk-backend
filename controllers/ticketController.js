const Ticket=require ('../models/Ticket')

const createTicket= async(req,res)=>{
try{
  const{title,description,priority,category,contactInfo}=req.body

const newTicket=await Ticket.create({
title, description,priority,category,contactInfo,createdBy:req.user._id
})

res.status(201).json(newTicket)

}catch(err){
  res.status(400).json({error: err.message})
}




}


module.exports={createTicket}