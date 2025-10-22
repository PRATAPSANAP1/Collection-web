const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Collection")
    .then(() => { console.log("Mongo connected for product") })
    .catch((err) => console.log("error of mongo product : ", err))

const productSchema = new mongoose.Schema({
    Product_ID: {
        type: String,
        required: true,
        unique: true
    },

    Product_Name: {
        type: String,
        required: true
    },
    Product_Category: {
        type: String,
        required: true
    },
    Product_Price: {
        type: String,
        required: true
    },
    Product_Stock: {
        type: String,
        required: true
    },
    Product_Trend: {
        type: String,
        required: true
    },
    Product_Status: {
        type: String,
        required: true,
    },
    Product_Images: {
        type: [String], // array of image file names
        required: true,
    },

});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;


