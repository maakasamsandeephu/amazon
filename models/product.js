const mongoose = require('mongoose');
const ratingSchema = require('./rating');

const productSchema = mongoose.Schema({


    name :{
        require: true,
        type: String,
        trim: true
    },

    description:{
        require:true,
        type: String,
        trim: true
    },
    quantity:{
        require:true,
        type: Number,
        
    },

    images:[{
        require:true,
        type: String,
        
    },],

    category:{
        require:true,
        type: String,
    },

    price:{
        require:true,
        type: Number,
        
    },

    ratings: [ratingSchema],


});

const Product = mongoose.model('Product', productSchema);
module.exports = {Product, productSchema};