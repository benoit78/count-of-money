const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const errorTypes = require("../utils/errorTypes");
const AppError = require("../utils/appError");


exports.addUserToReq = catchAsync(async (req, res, next) => {
  if (req.params.idUser) req.params.id = req.params.idUser;

  const user = await User.findById(req.params.id)
    .populate({
      path: "contracts.belongsTo.team",
      select: "name",
    })

    if (!user) return next(new AppError(errorTypes.NOT_FOUND));

  req.user = user;

  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    users,
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) return next(new AppError(errorTypes.NOT_FOUND));

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const updated = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updated) return next(new AppError(errorTypes.NOT_FOUND));

  res.status(200).json({
    status: "success",
    updated,
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const deleted = await User.findByIdAndDelete(userId);

  if (!deleted) return next(new AppError(errorTypes.NOT_FOUND));

  res.status(200).json({
    status: "success",
    deleted,
  });
})

exports.updateEmailById = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const updated = await User.findByIdAndUpdate(userId,  req.body  , {
    new: true,
    runValidators: true,
  });

  if (!updated) return next(new AppError(errorTypes.NOT_FOUND));

  res.status(200).json({
    status: "success",
    updated,
  });
});
