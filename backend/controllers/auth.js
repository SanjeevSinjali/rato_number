const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { User } = require('../models');

// Helper to send token in cookie & JSON response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIR) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'Lax',
    maxAge: 1 * 60 * 60 * 1000,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({ success: true, data: user });
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    path: '/',
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({ success: true, data: {} });
});


// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  // Sequelize update returns [affectedCount, affectedRows]
  const [updatedCount, updatedUsers] = await User.update(fieldsToUpdate, {
    where: { id: req.user.id },
    returning: true,
  });

  if (updatedCount === 0) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({ success: true, data: updatedUsers[0] });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  // Assume user instance method to check password (bcrypt)
  const isMatch = await user.matchPassword(req.body.currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});


// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password, contactNumber } = req.body;

  const user = await User.create({
    fullName,
    email,
    password,
    contactNumber
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // include password field, assuming User model scopes exclude it by default
  const user = await User.scope(null).findOne({ where: { email } });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});


