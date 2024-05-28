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
  // enable pagination
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.find({}).estimatedDocumentCount();

  try {
    const products = await Product.find()
      .populate("category")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res
      .status(201)
      .json({
        success: true,
        products,
        page,
        pages: Math.ceil(count / pageSize),
        count,
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
