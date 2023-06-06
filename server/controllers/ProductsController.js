import ProductModel from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const { sortBy, order, page, limit, colors, sizes, priceRange } = req.query;

    const sortOrder = order === "desc" ? -1 : 1;
    const sortField = sortBy || "_id";
    const skip = (page - 1) * limit;
    const sortColors = colors ? colors.split(",") : [];
    const sortSizes = sizes ? sizes.split(",") : [];
    const sortPriceRange = priceRange ? priceRange.split("-") : [];

    const filter = {};
    if (colors.length > 0) {
      filter.colors = { $all: sortColors };
    }
    if (sizes.length > 0) {
      filter.sizes = { $all: sortSizes };
    }
    if (priceRange.length > 0) {
      filter.price = { $gte: Number(sortPriceRange[0]), $lte: Number(sortPriceRange[1]) };
    }

    const products = await ProductModel.find({})
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const productsLength = await ProductModel.find({})
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .countDocuments();

    const maxPrice = await ProductModel.aggregate([
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.status(200).json({
      products,
      length: productsLength,
      maxPrice,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to receive product",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to receive product",
    });
  }
};
