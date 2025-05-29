const Product = require('../models/ProductModel')

//Create
const createProduct = (newProduct) =>{
    return new Promise(async(resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description } = newProduct
        try {
            const checkName = await Product.findOne({
                name: name
            })
            if(checkName !== null){
                resolve({
                    status: 'OK',
                    message: 'Tên mặt hàng đã tồn tại'
                })
            }
            const createProduct = await Product.create({
                name,
                image,
                type,
                price,
                countInStock,
                rating,
                description
            })
            if(createProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProduct
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

//Update
const updateProduct = (id, data) =>{
    return new Promise (async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('checkProduct', checkProduct)
            if(!checkProduct) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm không tồn tại'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            if(updateProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updateProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

//Get details
const getDetailsProduct = (id) => {
    return new Promise (async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if(!product) {
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm không tồn tại'
                })
            }
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

//Delete
const deleteProduct = (id) => {
    return new Promise (async (resolve, reject) =>{
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(!checkProduct){
                return resolve({
                    status: 'ERROR',
                    message: 'Sản phẩm không tồn tại'
                })
            }
            await Product.findByIdAndDelete(id)
            return resolve({
                status: 'OK',
                message: 'Xóa sản phẩm thành công'
            })
        } catch (e) {
            resolve (e)
        }
    })
}

//Get all
const getAllProduct = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const allProdut = await Product.find()
            return resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allProdut
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct

}