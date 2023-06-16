import OrderModel from "../models/order.js";
import UserModel from "../models/user.js";
import { generateRandom } from "../utils/generateRandom.js";
import { createObjectCsvWriter } from "csv-writer";

export const makeOrder = async (req, res) => {
  const { date, paymentMethod, discount, products, subTotal } = req.body;
  const userId = req.userId;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const orders = await OrderModel.find({ user: userId });
  const ordersLength = orders.length;

  const orderItem = new OrderModel({
    orderId: ordersLength + 1,
    date,
    subTotal,
    shippingAddress: user.address,
    paymentMethod,
    trackingNumber: `UA${generateRandom(20000000, 89000000)}RS`,
    discount,
    products,
    user: userId,
  });

  await orderItem.save();

  res.status(200).json({ orderItem, length: ordersLength });
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orders = await OrderModel.find({ user: userId });
    res.status(200).json({ items: orders, length: orders.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const exportCSV = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const orders = await OrderModel.find({ user: userId });

    const csvWriter = createObjectCsvWriter({
      path: "orders.csv",
      header: [
        { id: "orderId", title: "Order ID" },
        { id: "date", title: "Date" },
        { id: "status", title: "Status" },
        { id: "subTotal", title: "Subtotal" },
        { id: "discount", title: "Discount" },
        { id: "products", title: "Products" },
        { id: "shippingMethod", title: "Shipping Method" },
        { id: "shippingAddress", title: "Shipping Address" },
        { id: "paymentMethod", title: "Payment Method" },
        { id: "trackingNumber", title: "Tracking Number" },
        { id: "shipmentCost", title: "Shipment Cost" },
      ],
      fieldDelimiter: ";",
      alwaysQuote: true,
    });

    const csvRecords = orders.map((order) => {
      const products = order.products.map(
        (product) => `${product.title}(${product.size.toUpperCase()})`
      );
      return {
        orderId: order.orderId,
        date: order.date,
        status: order.status,
        subTotal: `${order.subTotal} UAH`,
        discount: `${order.discount}%`,
        products: products.join(", "),
        shippingMethod: order.shippingMethod,
        shippingAddress: order.shippingAddress,
        paymentMethod: `"${order.paymentMethod}"`,
        trackingNumber: order.trackingNumber,
        shipmentCost: `${order.shipmentCost} UAH`,
      };
    });

    await csvWriter.writeRecords(csvRecords);
    res.download("orders.csv");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
