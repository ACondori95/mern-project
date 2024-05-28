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
  // #swagger.tags=['Users']
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

    generateToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({success: false, message: "Cannot log in, check your credentials"});
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    expiresIn: new Date(Date.now() + process.env.EXPIRE_TOKEN),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({success: true, token});
};

exports.logout = (req, res, next) => {
  // #swagger.tags=['Users']
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out"});
};

exports.singleUser = async (req, res, next) => {
  // #swagger.tags=['Users']
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({success: true, user});
  } catch (error) {
    next(error);
  }
};
