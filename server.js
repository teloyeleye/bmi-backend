const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // req.body

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

const PORT = process.env.PORT;

// Database Connection
dbConnect();

const userRoutes = require("./routes/user-routes");

app.get("/", function (req, res) {
  res.send(`Tenigold BMI Server is live`);
});

app.use("/user", userRoutes.routes);

app.listen({ port: PORT }, async () => {
  console.log(`Server is running on localhost ${PORT}`);
});
