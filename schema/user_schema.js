const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: 'user' //two options: user or admin.
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model("UserSchema", UserSchema)
