const User = require('../schema/user_schema')
const userValidation = require('../validation/user_validation')
const bcrypt = require('bcrypt')
const saltRounds = 10;

exports.createUser = async (data) => {
    //User input validation
    const {error} = await userValidation.registerValidation(data)
    if (error) {
        console.log('Failed to create new user. Error Validating User Data.')
        return Promise.reject(error)
    }
    //checks if user already exists
    let user = await findUser(data.email)
    if (user) {
        console.log('User already exists with this email!')
        return Promise.reject(new Error('User with this email already exists!'))
    }

    let hashedPassword = await bcrypt.hash(data.password, 10).catch(e => {
        if (e) {
            console.log('Error hashing password')
            // return Promise.reject(new Error('Error hashing password'))
            return Promise.reject('Error hashing password')
        }
    })

    let newUser = new User({
        email: data.email,
        password: hashedPassword,
        date_created: Date.now(),
    })

    return await newUser.save();

    // let savedUser;
    // try{
    //     savedUser = await newUser.save();
    //     if (!savedUser) {
    //         return Promise.reject(new Error('No user was saved'))
    //     }
    //     return
    // }catch (e) {
    //     console.log('Error saving user')
    //     return Promise.reject(new Error('Error saving user'))
    // }
}

exports.login = async (data) => { //takes in req.body and req.session
    //User input validation
    const {error} = await userValidation.loginValidation(data)
    if (error) {
        console.log('Failed to login. Error validating user data');
        return Promise.reject(new Error())
    }

    let user = await findUser(data.email)
    if (!user) {
        console.log('No user with this email found!')
        // return Promise.reject(new Error('No user with this email found!'))
        return Promise.reject('No user with this email found!')
    }
    return user
    // session.isAuth = true;
    // session.uid = user._id

    //how to return session to controller?

}

exports.logout = (session) => {
    return session.destroy()
}

//helper method to help find if user exists
let findUser = async (email) => {
    return await User.findOne({email: email})
}