// const connectDB = require("./db/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const authRoute = require("./routers/auth");
const userRoute = require("./routers/user");
const movieRoute = require("./routers/movies");
const listRoute = require("./routers/lists");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connectDB(URI);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(5001, () => {
  console.log(`Server is running on 5001!`);
});
