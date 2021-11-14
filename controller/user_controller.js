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
        return res.status(500).json({message: 'Error creating user. ' + e})
    }
}

exports.login = async (req, res) => {
    try{
        const user = await userModel.login(req.body)
        if (!user) {
            console.log('No User??')
            return res.status(400).json({message: 'No user. Error??'})
        }
        req.session.uid = user._id
        req.session.isAuth = true
        console.log('Login Successful!')
        return res.status(200).json({message: 'Login successful!', id: user._id})
    }catch (e) {
        console.log('Error logging in: ' + e)
        return res.status(400).json({message: 'Error logging in: ' + e})
    }


}

exports.logout = (req, res) => {
    req.session.destroy()
    return res.status(200).json({message: 'Logout successfully'})
}