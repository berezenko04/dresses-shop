import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    },
    desc: {
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
    },
    rating: {
        type: Number,
        required: true
    },
    sizes: {
        type: Array,
        items: {
            type: String
        },
        required: true
    }
}, {
    timestamps: true,
});

export default mongoose.model('Product', ProductSchema);