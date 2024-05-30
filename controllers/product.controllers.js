const Product = require("../models/product.models");

exports.createProduct = async (req, res, next) => {
  // #swagger.tags=['Products']
  const {name, description, price, category, provider} = req.body;
  try {
    const product = await Product.create({
      name,
      description,
      price,
      provider,
      category,
    });
    res.status(201).json({success: true, product});
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

    res.status(201).json({
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

exports.updateProduct = async (req, res, next) => {
  // #swagger.tags=['Products']
  try {
    // build the data object
    const data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      provider: req.body.provider,
      category: req.body.category,
    };

    const productUpdate = await Product.findOneAndUpdate(
      {_id: req.params.id},
      data,
      {
        new: true,
      }
    );

    res.status(200).json({success: true, productUpdate});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  // #swagger.tags=['Products']
  try {
    const product = await Product.findByIdAndDelete({_id: req.params.id});
    res.status(201).json({success: true, message: "Product deleted"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.productCategory = async (req, res, next) => {
  // #swagger.tags=['Products']
  try {
    const cat = await Product.find()
      .populate("category", "name")
      .distinct("category");
    res.status(201).json({success: true, cat});
  } catch (error) {
    console.log(error);
  }
};
