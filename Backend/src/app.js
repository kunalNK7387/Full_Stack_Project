const express = require("express");
const cookiePasrser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookiePasrser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

/* require all routes here  */
const authRouter = require("./routes/auth.routes");

/* using all the routes here */
app.use("/api/auth", authRouter);

module.exports = app;
