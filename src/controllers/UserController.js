const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try{
        const{ name, email, password, confirmPassword, phone } = req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầu đủ thông tin'
            })
        } else if(!isCheckEmail){
             return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            })
        } else if( password !== confirmPassword){
             return res.status(200).json({
                status: 'ERR',
                message: 'Xác nhận mật khẩu không khớp'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Đăng nhập
const loginUser = async (req, res) => {
    try{
        const{ email, password} = req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = reg.test(email)
        if(!email || !password){
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầu đủ thông tin'
            })
        } else if(!isCheckEmail){
             return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            })
        }
        
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Update
const updateUser = async (req, res) => {
    try{
        const userId = req.params.id
        const data = req.body
        if(!userId || !data){
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầu đủ thông tin'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Delete
const deleteUser = async (req, res) => {
    try{
        const userId = req.params.id
        const token = req.headers
        console.log('userId', userId)
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầu đủ thông tin'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//GetAll
const getAllUser = async (req, res) => {
    try{
        const response = await UserService.getAllUser()
        return res.status(200).json(response)

    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

//Get Detail User
const getDetailsUser = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//RefreshToken
const refreshToken = async (req, res) => {
    try{
        const token = req.headers.token.split(' ')[1]
        if(!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken
}