const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://full-stack-project-ten-sandy.vercel.app",
    credentials: true,
  }),
);

app.get("/test", (req, res) => {
  res.json({
    message: "Server is working",
  });
});

// TEMPORARY COOKIE TEST
app.get("/test-cookie", (req, res) => {
  res.cookie("testToken", "hello123", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.json({
    message: "Test cookie sent",
  });
});

/* require all routes here */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* using all the routes here */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
