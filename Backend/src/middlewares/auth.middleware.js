const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  console.log("========== AUTH MIDDLEWARE ==========");
  console.log("Cookies:", req.cookies);
  console.log("Token:", req.cookies.token ? "TOKEN FOUND" : "TOKEN NOT FOUND");

  const token = req.cookies.token;

  if (!token) {
    console.log("❌ Token not provided");
    return res.status(401).json({
      message: "Token not Provided",
    });
  }

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({
    token,
  });

  if (isTokenBlacklisted) {
    console.log("❌ Token is blacklisted");

    return res.status(401).json({
      message: "token is invalid",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified");
    console.log("User:", decode);

    req.user = decode;

    next();
  } catch (err) {
    console.log("❌ JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
