 exports.Homepage = (req, res) => {
     res.json({
         message: "Homepage",
         getAllProducts : "/api/products/",
         addProduct : "api/product/create/",
         updateProduct : "api/product/:productId",
         deleteProduct: "api/product/:productId",
         addReview: "api/product/:productId/review"
     });
 };

 