const User = require("../models/user.models");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  // #swagger.tags=['Users']
  const {email} = req.body;
  const userExists = await User.findOne({email});

  if (userExists) {
    return next(new ErrorResponse("Email already exists", 400));
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
      return next(new ErrorResponse("Email and password are required", 400));
    }

    // check user email
    const user = await User.findOne({email});
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // verify user password
    const isModified = await user.comparePassword(password);
    if (!isModified) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    generateToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Cannot log in, check your credentials", 400));
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
    next(new ErrorResponse(`User with id ${req.params.id} is not found`, 404));
  }
};