const ProductService = require('../services/ProductService')

//Create
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if(!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Update
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId || !data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Get details
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Vui lòng nhập đầy đủ thông tin'
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

//Delete
const deleteProduct = async (req, res) => {
    const productId = req.params.id
    if(!productId) {
        return res.status(200).json({
            status: 'ERROR',
            message: 'Sản phẩm không tồn tại'
        })
    }
    const response = await ProductService.deleteProduct(productId)
    return res.status(200).json(response)
}

//Get All
const getAllProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllProduct()
        return res.status(200).json(response)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}