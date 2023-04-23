import CommentModel from '../models/comment.js'
import ProductModel from '../models/product.js'

export const createComment = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        const comment = new CommentModel({
            product: product._id,
            user: req.body.user,
            text: req.body.text,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            rating: req.body.rating,
            date: req.body.date
        });

        const savedComment = await comment.save();
        res.json(savedComment)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred while adding a comment"
        })
    }
}

export const getComments = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const comments = await CommentModel.find({ product: id });
        const commentsLength = comments.length;
        res.status(200).json({
            comments,
            length: commentsLength
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to receive product'
        });
    }
}
