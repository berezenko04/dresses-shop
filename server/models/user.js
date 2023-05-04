import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    avatarUrl: {
        type: String,
        default: '/default-avatar.png'
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    wishList: {
        type: Array,
        items: {
            id: {
                type: Number,
                unique: true
            },
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
            },
        }
    },
    cart: {
        type: Array,
        items: {
            id: {
                type: Number,
                unique: true
            },
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
            },
        }
    }
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);