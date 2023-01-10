const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

const router = express.Router({ mergeParams: true });

/**
 * /users
 */

// this route will be disabled on production



// OAuth2 routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }),  (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=${encodeURIComponent('http://localhost:3000/google/callback')}&scope=profile%20email&client_id=${clientId}`;
  res.redirect(redirectUrl)});

router.post(
  "/signup",
  authController.signup,
  authController.createToken,
  authController.getUserAndToken
);

router.post(
  "/signup-root",
  authController.signUpRoot,
  authController.createToken,
  authController.getUserAndToken
);

router.post(
  "/login",
  authController.login,
  authController.createToken,
  authController.getUserAndToken
);

// router.use(authController.protect);

router
  .route("/allUsers")
  .get(userController.getAllUsers)

router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUserById);

module.exports = router;
