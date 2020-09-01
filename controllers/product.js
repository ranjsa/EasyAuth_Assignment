const Product = require('../models/product'); 
const Review = require('../models/reviews');
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs');
const { parse } = require('path');

exports.getProductById = (req, res, next, id) => {
    Product.findById(id).populate("reviews").exec((err, product) => {
        if (err) {
            return res.status(400).json({
                error: "PRODUCT NOT FOUND"
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;


    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with Image"
            });
        }
        
        //destructuring fields
        const {name, description, price} = fields;

        if (
            !name || 
            !description ||
            !price 
        ) {
            return res.status(400).json({
                error: "Please include all fileds"
            });
        }
        let product =  new Product(fields);

        //handel file 
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size too Big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type 
        }

        //save to the DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Saving product in DB Failed"
                })
            }
            res.json(product) 
        })
    });
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
} 


//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deleatedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: "Successfully Deleated",
            deleatedProduct
        })
    })
}

//update controller
exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }
        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        //handle file here
        if (file.photo) {
            if(file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Updation Failed"
                });
            }
            res.json(product); 
        });
    });
}

//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if (err) {
            return  res.status(400).json({
                error: "No Product Found"
            })
        }
        res.json(products)
    })
}

//add Review
exports.addReview = (req, res) => {
    Review.create(req.body)
    .then(function(dbReview) {
        return Product.findOneAndUpdate({_id: req.params.productId},
            {$push: {reviews: dbReview._id}}, {new: true});
    })
    .then(function(dbProduct ) {
        res.json(dbProduct);
    })
    .catch(function(err) {
        res.json(err);
    });
}