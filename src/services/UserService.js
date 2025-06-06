const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        // const{ name, email, password, confirmPassword, phone } = newUser
        const{ email, password, confirmPassword} = newUser

        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null){
                resolve({
                    status: 'ERR',
                    message: 'Email đã tồn tại'
                })
            } else if(password !== confirmPassword){
                resolve({
                    status: 'ERR',
                    message: 'Xác nhận mật khẩu không khớp'
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const createdUser = await User.create({
                email,
                password: hashedPassword,
                
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
        const{  email, password } = userLogin
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null){
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                })
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password)
            console.log('comparePassword', comparePassword)
            if(!comparePassword){
                resolve({
                    status: 'ERR',
                    message: 'Mật khẩu không đúng'
                })
            }
            const access_token = await generalAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generalRefreshToken({
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

//Delete
const deleteUser = (id) => {
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
            await User.findByIdAndDelete(id)
            return resolve({
                status: 'OK',
                message: 'Xóa người dùng thành công'
            })
    
        } catch(e){
            reject(e)
        }
    })
}

//GetAll
const getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try{
            const allUser = await User.find()
            return resolve({
                status: 'OK',
                message: 'Lay thong tin thanh cong',
                data: allUser
            })
    
        } catch(e){
            reject(e)
        }
    })
}

//Get Details User
const getDetailsUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try{
            const user = await User.findOne({
                _id: id
            })
            if(!user){
                resolve({
                    status: 'OK',
                    message: 'Người dùng không tồn tại'
                })
            }
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
    
        } catch(e){
            reject(e)
        }
    })
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser
    
}