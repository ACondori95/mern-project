const Product = require("../models/product.models");
const ErrorResponse = require("../utils/errorResponse");

exports.createProduct = async (req, res, next) => {
  // #swagger.tags=['Products']
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
    category: req.body.category,
  };
  try {
    const response = await Product.create(product);
    res.status(201).json({success: true, response});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.displayProduct = async (req, res, next) => {
  // #swagger.tags=['Products']
  try {
    const products = await Product.find().populate("category");
    res.status(201).json({success: true, products});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
