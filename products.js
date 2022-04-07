const mongoose = require('mongoose')
const productSchema =  new mongoose.Schema({
    firstname: String,
    lastname: String,
    location: String
});

module.exports = mongoose.model('products',productSchema)