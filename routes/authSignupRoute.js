const express = require('express')
const bcrypt = require('bcrypt');
const signupRouter = express.Router();
const createDB = require('./../config/db')
const User = require('./../models/userModel')
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");
createDB.sync().then(() => console.log("DB Runing"))

let users = []

signupRouter.post("/signup",async (req, res) => {
try {
    const { name, email, password } = req.body; 

    const userExists = await User.findOne({
      where:{
        email
      }
    });

    if (userExists) {
      return res.status(403).send("User already exists"); 
    }

    if (!validateName(name)) {
      return res
        .status(400)
        .send(
          "Error: Invalid user name: name must be longer than two characters and must not include any numbers or special characters"
        );
    }

    if (!validateEmail(email)) {
      return res.status(400).send("Error: Invalid email");
    }

    if (!validatePassword(password)) {
      return res
        .status(400)
        .send(
          "Invalid password: password must be at least 8 characters long and must include atlest one - one uppercase letter, one lowercase letter, one digit, one special character"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const dataUser = {name,email,password:hashedPassword}
    const createdUser = await User.create(dataUser)

    return res
      .status(201)
      .send(
        `Welcome to Devsnest ${createdUser.name}. Thank you for signing up`
      );
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
})



module.exports = signupRouter