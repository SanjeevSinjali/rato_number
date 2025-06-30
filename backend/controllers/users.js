import { Sequelize } from 'sequelize';
import asyncHandler from "../middleware/async.js";
import User from "../models/user.js";

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
export const createUser = asyncHandler(async (req, res, next) => {

  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    throw error;
  }

});

// @desc      Update user
// @route     PUT /api/v1/auth/users/:id
// @access    Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  await user.update(req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Delete user
// @route     DELETE /api/v1/auth/users/:id
// @access    Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  await user.destroy();

  res.status(200).json({
    success: true,
    data: {},
  });
});

