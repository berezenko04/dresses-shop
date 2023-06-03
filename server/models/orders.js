const OrderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    payment: {
      name: {
        type: String,
        required: true,
      },
      data: {
        type: String,
        required: true,
      },
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    products: {
      items: {
        imageUrl: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
