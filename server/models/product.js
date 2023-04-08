import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

export default mongoose.model('Product', ProductSchema);