const express = require("express");
const authController = require("../controllers/auth.controllers");
const authRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access public
 */

authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 * @description clear token from the user cookie and add the token in blacklist
 * @access public
 */

authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

module.exports = authRouter;
