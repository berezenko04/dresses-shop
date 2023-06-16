import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Shipped",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    shippingMethod: {
      type: String,
      default: "Express delivery (DHL Express)",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    trackingNumber: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      items: {
        imageUrl: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    },
    subTotal: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shipmentCost: {
      type: Number,
      default: 1200,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
