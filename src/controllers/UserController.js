const UserService = require('../services/UserService')

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
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser,
    loginUser
}