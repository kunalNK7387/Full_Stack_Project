const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  console.log("1️⃣ AUTH MIDDLEWARE STARTED");

  const token = req.cookies.token;

  console.log("2️⃣ TOKEN:", token ? "FOUND" : "NOT FOUND");

  if (!token) {
    console.log("❌ NO TOKEN");

    return res.status(401).json({
      message: "Token not Provided",
    });
  }

  console.log("3️⃣ CHECKING BLACKLIST");

  const isTokenBlacklisted = await tokenBlacklistModel.findOne({
    token,
  });

  console.log("4️⃣ BLACKLIST CHECK FINISHED");

  if (isTokenBlacklisted) {
    console.log("❌ TOKEN BLACKLISTED");

    return res.status(401).json({
      message: "token is invalid",
    });
  }

  try {
    console.log("5️⃣ VERIFYING JWT");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log("6️⃣ JWT VERIFIED");

    req.user = decode;

    console.log("7️⃣ CALLING NEXT");

    next();
  } catch (err) {
    console.log("❌ JWT ERROR:", err.message);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = { authUser };
