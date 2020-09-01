const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, updateProduct ,deleteProduct, getAllProducts, addReview } = require("../controllers/product");

router.param("productId", getProductById)

//create route
router.post("/product/create/", createProduct);

//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//listing route
router.get("/products", getAllProducts)

//update route
router.put("/product/:productId", updateProduct);

//delete route
router.delete("/product/:productId", deleteProduct);

//add review
router.post("/product/:productId/review", addReview)


module.exports = router;