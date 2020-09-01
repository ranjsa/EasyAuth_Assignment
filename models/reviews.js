const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new mongoose.Schema({
    
    name: String,
    comment: String,
    rating: Number,
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

module.exports = mongoose.model("Reviews", ReviewSchema);