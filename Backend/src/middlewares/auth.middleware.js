const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provided",
    });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({
    token,
  });
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "token is  invalid",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
