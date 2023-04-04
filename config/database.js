// external imports
const mongoose = require("mongoose");
require("dotenv").config();

async function dbConfig() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => console.log("BMI Database Connected"))
    .catch((err) => console.warn(err));
}

module.exports = dbConfig;
