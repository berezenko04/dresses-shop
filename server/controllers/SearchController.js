import ProductModel from "../models/product.js";

export const getSearchSuitable = async (req, res) => {
  try {
    const { text } = req.query;

    if (!text) {
      return res.status(200).json([]);
    }

    const regex = new RegExp(text, "i");

    const matchingProducts = await ProductModel.find({ title: { $regex: regex } })
      .limit(4)
      .sort({
        title: -1,
      });

    res.status(200).json(matchingProducts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred while adding a comment",
    });
  }
};
