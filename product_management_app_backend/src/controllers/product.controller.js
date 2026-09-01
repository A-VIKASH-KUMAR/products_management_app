const {v4} = require("uuid")
const { getCollection } = require("../../db");
const createProduct=async(req,res)=>{
try {
   const {name,category,price,stock,status}=req.body;
   const productsCollection=await getCollection("products")
   const productData=await productsCollection.findOne({"name":name})
    if(productData){
        return res.status(409).send({"msg":"product data already exists"})
    }
    const productInsertResponse=await productsCollection.insertOne({"id":v4(),"name":name,"category":category,"price":price,"stock":stock,"status":status,"lastUpdated":new Date()})
    return res.status(201).json({msg:"Successfully created product"})
} catch (error) {
    console.error("Error occured in create product",error)
    return res.status(500).json({msg:"Internal server error"})
}
}

const getProduct=async(req,res)=>{
try {
   const {id}=req.params;
   const productsCollection=await getCollection("products")
   const productData=await productsCollection.findOne({"id":id})
    if(!productData){
        return res.status(404).send({"msg":"product not found"})
    }
    return res.status(200).json(productData)
} catch (error) {
    console.error("Error occured in get product",error)
    return res.status(500).json({msg:"Internal server error"})
}
}

const getProducts=async(req,res)=>{
try {
   const limit=parseInt(req.query.limit)||5;
   const offset=parseInt(req.query.offset)||0;
   const productsCollection=await getCollection("products")
   const total=await productsCollection.countDocuments()
   const products=await productsCollection.find().skip(offset).limit(limit).toArray()
    return res.status(200).json({total:total,limit:limit,offset:offset,data:products})
} catch (error) {
    console.error("Error occured in get products",error)
    return res.status(500).json({msg:"Internal server error"})
}
}

const updateProduct=async(req,res)=>{
try {
   const {id}=req.params;
   const {name,category,price,stock,status}=req.body;
   const productsCollection=await getCollection("products")
   const updateResponse=await productsCollection.updateOne(
       {"id":id},
       {$set:{"name":name,"category":category,"price":price,"stock":stock,"status":status,"lastUpdated":new Date()}}
   )
    if(updateResponse.matchedCount===0){
        return res.status(404).send({"msg":"product not found"})
    }
    return res.status(200).json({msg:"Successfully updated product"})
} catch (error) {
    console.error("Error occured in update product",error)
    return res.status(500).json({msg:"Internal server error"})
}
}

const deleteProduct=async(req,res)=>{
try {
   const {id}=req.params;
   const productsCollection=await getCollection("products")
   const deleteResponse=await productsCollection.deleteOne({"id":id})
    if(deleteResponse.deletedCount===0){
        return res.status(404).send({"msg":"product not found"})
    }
    return res.status(200).json({msg:"Successfully deleted product"})
} catch (error) {
    console.error("Error occured in delete product",error)
    return res.status(500).json({msg:"Internal server error"})
}
}

module.exports = {createProduct,getProduct,getProducts,updateProduct,deleteProduct}
