const mongoose = require('mongoose')
const uri = process.env.MONGO_URI || require('../config/secret')

const connectDB = async () => {
    try{
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10
        }).then(() => {
            console.log('MongoDB Atlas Connected')
        }).catch(e => {
            if (e) {
                console.log(e)
            }
        })
    }catch (e) {
        console.log('Error connecting to MongoDB')
        console.log(e)
    }
}

module.exports = connectDB