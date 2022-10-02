const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const homeRoute = require("./routes/home");

dotenv.config();

// connecting mongo database
const database = process.env.MONGO_URL;
mongoose
  .connect(database)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/auth/", authRoute);
app.use("/", homeRoute);

//  server port
app.listen(8000, () => {
  console.log("Backend server is running!");
});
