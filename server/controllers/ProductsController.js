import ProductModel from '../models/product.js'

export const getProducts = async (req, res) => {
    try {
        const { sortBy, order } = req.query;
        const sortOrder = order === 'desc' ? -1 : 1;
        const sortField = sortBy || '_id';
        const products = await ProductModel.find({}).sort({ [sortField]: sortOrder });
        const productsLength = products.length;
        res.status(200).json({
            products,
            length: productsLength
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive product'
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findOne({ _id: id });
        if (product) {
            res.send(product);
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive product'
        });
    }
}


