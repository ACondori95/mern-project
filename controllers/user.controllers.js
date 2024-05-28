const User = require("../models/user.models");

exports.signup = async (req, res, next) => {
  // #swagger.tags=['Users']
  const {email} = req.body;
  const userExists = await User.findOne({email});

  if (userExists) {
    return res
      .status(400)
      .json({success: false, message: "Email already exists"});
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({success: true, user});
  } catch (error) {
    console.log(error);
    res.status(400).json({success: false, message: error.message});
  }
};

exports.signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({success: false, message: "Email and password are required"});
    }

    // check user email
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(400)
        .json({success: false, message: "Invalid credentials"});
    }

    // verify user password
    const isModified = await user.comparePassword(password);
    if (!isModified) {
      return res
        .status(400)
        .json({success: false, message: "Invalid credentials"});
    }

    const token = await user.jwtGenerateToken();

    res.status(200).json({success: true, token});
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({success: false, message: "Cannot log in, check your credentials"});
  }
};
