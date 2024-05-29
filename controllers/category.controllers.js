const Category = require("../models/category.models");

exports.createCategory = async (req, res, next) => {
  // #swagger.tags=['Categories']
  const {name} = req.body;
  try {
    const category = await Category.create({name});
    res.status(201).json({success: true, category});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  // #swagger.tags=['Categories']
  try {
    const categories = await Category.find();
    res.status(201).json({success: true, categories});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  // #swagger.tags=['Categories']
  try {
    const data = {name: req.body.name};

    const categoryUpdate = await Category.findOneAndUpdate(
      {_id: req.params.id},
      data,
      {new: true}
    );

    res.status(200).json({success: true, categoryUpdate});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  // #swagger.tags=['Categories']
  try {
    const category = await Category.findByIdAndDelete({_id: req.params.id});
    res.status(201).json({success: true, message: "Category deleted"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
