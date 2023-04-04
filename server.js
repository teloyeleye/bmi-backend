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

const PORT = process.env.PORT;

dbConnect();

app.listen({ port: PORT }, async () => {
  console.log(`Server is running on localhost ${PORT}`);
});
