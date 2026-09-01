const Router = require("express")
const { createProduct, getProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product.controller")
const router=Router()
router.post("/",createProduct)
router.get("/",getProducts)
router.get("/:id",getProduct)
router.put("/:id",updateProduct)
router.delete("/:id",deleteProduct)
module.exports= router