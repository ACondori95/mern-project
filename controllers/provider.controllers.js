const Provider = require("../models/provider.models");

exports.createProvider = async (req, res, next) => {
  // #swagger.tags=['Providers']
  const {name, importance} = req.body;
  try {
    const provider = await Provider.create({name, importance});
    res.status(201).json({success: true, provider});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getProviders = async (req, res, next) => {
  // #swagger.tags=['Providers']
  try {
    const providers = await Provider.find();
    res.status(201).json({success: true, providers});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateProvider = async (req, res, next) => {
  // #swagger.tags=['Providers']
  try {
    const data = {name: req.body.name, importance: req.body.importance};

    const providerUpdate = await Provider.findOneAndUpdate(
      {_id: req.params.id},
      data,
      {new: true}
    );

    res.status(200).json({success: true, providerUpdate});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteProvider = async (req, res, next) => {
  // #swagger.tags=['Providers']
  try {
    const provider = await Provider.findByIdAndDelete({_id: req.params.id});
    res.status(201).json({success: true, message: "Provider deleted"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};
