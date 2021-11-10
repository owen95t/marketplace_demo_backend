const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let item_schema = new Schema({
    item_name: {
        type: String,
        required: true
    },
    item_desc: {
        type: String,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_discount:{
        type: Number,
        required: true
    },
    item_owner_id: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: true
    },
    item_status: { //show or hide item
        type: Boolean,
        required: true
    },
    item_rating: { //from 1 to 5
        type: Number,
        min: 0,
        max: 5
    },
    user_id: {
        type: String,
        required: true
    }
}, {
    collection: 'items'
})

module.exports = mongoose.model("ItemSchema", item_schema)