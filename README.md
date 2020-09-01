# EasyAuth_Assignment
API hosted At <http://ec2-54-173-132-62.compute-1.amazonaws.com:8000/api/>

# Product API

## API Architecture
![API IMAGE](https://github.com/ranjsa/EasyAuth_Assignment/blob/master/PRODUCT_API.png)

| HTTP verbs | API Endpoints  | Function  |
|---|---|---|
|GET| /  |  Homepage:- displays all the information about the API |
|GET| /api/products  |  get All Products  |
|POST| /api/product/create/  |  Add Product  |
|PUT| /api/product/:productId  |  Update Product  |
|DELETE| /api/product/:productId |  Delete Products  |
| POST| /api/product/:productId/review  |  Add Reviews to the Product  |
