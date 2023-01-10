const { promisify } = require("util");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const AppError = require("../utils/appError");
const errorTypes = require("../utils/errorTypes");
require('dotenv').config();

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 12),
  });
  newUser.save()
  req.user= newUser
  next();
});

exports.signUpRoot = catchAsync(async (req, res, next) => {
  const password = await bcrypt.hash("root", 12);

  const userRoot = await User.collection.insert({
    email: "root@root.com",
    role: "root",
    password,
  });

  req.user= userRoot
  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError(errorTypes.MISSING_EMAIL_OR_PASS));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    return next(new AppError(errorTypes.BAD_CREDENTIALS));

  req.user = user;
  next();
});

exports.createToken = (req, res, next) => {
  const { user } = req;

  req.token = signToken({
    id: user._id,
    role: user.role,
  });

  next();
};

exports.getUserAndToken = (req, res, next) => {
  const { user, token, } = req;
  const {email, role, _id } = user;

  res.status(200).json({
    status: "success",
    token,
    user: {
      email,
      role,
      _id,
    },
  });
};

// this function check the JWT and add the User that made the request to req
// exports.protect = catchAsync(async (req, res, next) => {
//   const { authorization } = req.headers;

//   let token = "";
//   if (authorization && authorization.startsWith("Bearer ")) {
//     token = authorization.split(" ")[1];
//   } /*else if (req.cookies.jwt) {
//         token = req.cookies.jwt;
//     }*/
//   if (!token) return next(new AppError(errorTypes.MISSING_TOKEN));

//   // need to promisify because if the token is incorrect, verify will throw an error
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) return next(new AppError(errorTypes.NO_USER_RELATED));

//   if (currentUser.hasPasswordBeenChangedAfter(decoded.iat))
//     return next(new AppError(errorTypes.USER_CHANGED_PASS));

//   req.user = currentUser;
//   next();
// });