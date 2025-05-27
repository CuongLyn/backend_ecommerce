const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { generalAccessToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const{ name, email, password, phone } = newUser
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'OK',
                    message: 'Email đã tồn tại'
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await User.create({
                name, 
                email, 
                password: hashedPassword, 
                phone
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })
            }
        } catch(e){
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const{ name, email, password, phone } = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status: 'OK',
                    message: 'Người dùng không tồn tại'
                })
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if(!comparePassword){
                resolve({
                    status: 'OK',
                    message: 'Mật khẩu không đúng'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            console.log('access_token: ', access_token)
            if(checkUser && comparePassword){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    access_token,
                    refresh_token,
                })
            }
        } catch(e){
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser', checkUser)
            if(!checkUser){
                resolve({
                    status: 'OK',
                    message: 'Người dùng không tồn tại'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            if(updatedUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedUser
                })
            }
        } catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser
}