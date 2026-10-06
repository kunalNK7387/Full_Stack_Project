const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 *
 * @name registerUserController
 * @description register a new user, expects username,email and password in the request body
 * @access public
 */

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username,email and password",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Account already exists with this email address or username",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @name loginUserController
 * @description login a user , expects email and password in the request body
 * @access public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Inavalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered Succesfully",
    user: {
      id: user._id,
      username: user.username,
      emai: user.email,
    },
  });
}

/**
 * @name logoutUserController
 * @description logout user and move the token in blacklist
 * @access public
 */

async function logoutUserController(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }
  res.clearCookie("token");

  res.status(200).json({
    message: "User Logout Successfully",
  });
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */

async function getMeController(req, res) {
  console.log("8️⃣ GET ME CONTROLLER STARTED");

  console.log("9️⃣ USER ID:", req.user.id);

  const user = await userModel.findById(req.user.id);

  console.log("🔟 USER QUERY FINISHED");

  if (!user) {
    console.log("❌ USER NOT FOUND");

    return res.status(404).json({
      message: "User not found",
    });
  }

  console.log("✅ USER FOUND");

  return res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
