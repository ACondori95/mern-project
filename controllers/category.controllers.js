const Category = require("../models/category.models");
const ErrorResponse = require("../utils/errorResponse");

exports.createCategory = async (req, res, next) => {
  // #swagger.tags=['Categories']
  const category = {name: req.body.name};
  try {
    const response = await Category.create(category);
    res.status(201).json({success: true, response});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
