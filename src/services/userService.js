const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.register=(userData) =>{
return User.create(userData)
}


exports.login = async(username, password) =>{
    const user = await User.findOne({username})

    //validete username
    if(!user){
        throw new Error('invalid username or password')
    }
//validete password
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        throw new Error('invalid username or password')
    }


    return user
}