import ProductModel from '../models/product.js'

export const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.send(products);
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

export const getProductsCount = async (req, res) => {
    ProductModel.countDocuments({}, (err, count) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: "Failed to get the number of products"
            });
        } else {
            res.json({
                message: "Success",
                count: count
            });
        }
    });
}