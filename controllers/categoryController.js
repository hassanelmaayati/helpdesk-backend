const Category = require('../models/Category');

const index = async (req,res)=>{
try{
    const categories = await Category.find();
    res.status(200).json(categories);
}
catch(err){
res.status(500).json({ error: err.message });
}
}


const create = async (req,res)=>{
try{
 if (req.user.role !== 'it-staff') {
 return res.status(403).json({ error: 'Access denied' });
 }
const newCategory = await Category.create(req.body)
res.status(201).json(newCategory);
 }
catch(err){
res.status(500).json({ error: err.message });
}
}


module.exports={
    index,
    create,
}