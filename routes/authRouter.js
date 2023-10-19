const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


//Signup Route
// async/await = allows program to do multiple things at the same time; async = contains asynchronous operations;
authRouter.post("/signup", async (req, res, next) => { // litens for HTTP POST at the "signup"
  try {// 
    const existingUser = await User.findOne({ username: req.body.username.toLowerCase() }); // await = tells program to wait to see if it finds a user with same name
    // Looks to see if there is a user already exist
    if (existingUser) {
      res.status(403);
      throw new Error("The username is already taken");
    }
    const newUser = new User(req.body);
    const savedUser = await newUser.save(); // await - creates new user object and saves to database
    const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET); // after user saved generates JWT; 17.1 withoutPassword()
    res.status(201).send({ token, user: savedUser.withoutPassword() }); // response = sending 201 code including JWT token and user info; 17.1 withoutPassword()
  } catch (err) {
    res.status(500);
    next(err);
  }
});
//login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    if (!user) {
      res.status(500)
      return next(new Error("Username or password are incorrect"))
    }
    // 16.1 
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      if (!isMatch) {
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET) // 17.1 withoutPassword()
      return res.status(200).send({ token, user: user.withoutPassword() }) // 17.1 withoutPassword()
    })
  })
});


module.exports = authRouter
