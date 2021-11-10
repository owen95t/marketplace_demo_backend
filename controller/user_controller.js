const userModel = require('../model/user_model')

exports.createUser = async (req, res) => {
    console.log(req.body)
    try{
        await userModel.createUser(req.body).then(result => {
            if (!result) {
                console.log('No user was created')
                return res.status(400).json({message: 'No user was created. Controller Problem'})
            }
            return res.status(201).json({message: 'User created successfully!'})
        })
    }catch (e) {
        console.log('Error creating user' + e)
        return res.status(500).json({message: 'Error creating user. Please try again. ' + e})
    }
}

exports.login = async (req, res) => {

}