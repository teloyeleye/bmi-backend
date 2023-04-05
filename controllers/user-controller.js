"use strict";

const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config();

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const checker = await User.findOne({
      email: email,
    });

    if (checker) {
      res.send({ success: "Email already exists" });
      return;
    }

    const createUser = await new User({
      name: name,
      email: email,
      role: role,
      bmi: 0,
      password: password,
    });
    createUser
      .save()
      .then((result) => {
        res.send({ success: "User Created Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Creating User" });
  }
};

// Fetch all Users
const getUsers = async (req, res) => {
  try {
    await User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Fetching Users" });
  }
};

// Fetch Single User
const viewUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findById(id)
      .then((result) => {
        let id = result._id;
        let email = result.email;
        let name = result.name;
        let password = result.password;
        let role = result.role;
        let bmi = result.bmi;
        let createdAt = result.createdAt;
        let updatedAt = result.updatedAt;
        let user = {
          id,
          name,
          email,
          role,
          password,
          bmi,
          createdAt,
          updatedAt,
        };
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Fetching User" });
  }
};

// Login A User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let checker = await User.findOne({ email: email });
    if (!checker) {
      // res.send({ error: "User does not exists" });

      return res.status(401).json({ error: "User does not exist" });
    }

    User.findOne({ email: email })
      .then((result) => {
        let respassword = result.password;

        if (respassword === password) {
          //   return success response
          res.status(200).send({
            message: "Login Successful",
            email: result.email,
            name: result.name,
            role: result.role,
            bmi: result.bmi,
          });
        } else {
          return res.status(400).json({ error: "Credential Doesn't Match" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Fetching User" });
  }
};

// Update An User BMI
const updateUserBMI = async (req, res) => {
  try {
    const id = req.params.id;
    const { bmi } = req.body;

    await User.findByIdAndUpdate(
      id,
      {
        bmi: bmi,
      },
      { upsert: true }
    )
      .then((result) => {
        res.send({ success: "User BMI Updated Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Updating User" });
  }
};

// Delete An User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id)
      .then((result) => {
        res.send({ success: "User Deleted Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Deleting User" });
  }
};

// Delete All Users
const truncateAllUser = async (req, res) => {
  try {
    await User.deleteMany()
      .then((result) => {
        res.send({ success: "Users Truncated Successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    return res.status(500).json({ error: "Error Truncating All Users" });
  }
};

module.exports = {
  createUser,
  getUsers,
  viewUser,
  loginUser,
  updateUserBMI,
  deleteUser,
  truncateAllUser,
};
