const express = require("express");
const authController = require("../controllers/auth.controllers");
const authRouter = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController);

module.exports = authRouter;
