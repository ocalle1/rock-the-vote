const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');

app.use(express.json());
app.use(morgan('dev'));

process.env.SECRET

mongoose.connect('mongodb://localhost:27017/redone-rtv',);

app.use('/auth', require('./routes/authRouter.js'));
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })); // req.user
app.use('/api/todo', require('./routes/todoRouter.js'));
// added /issue
app.use('/api/issue', require('./routes/issueRoutes.js'));
//  add comments
app.use('/api/comment', require('./routes/CommentRouter.js'));


app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
});

app.listen(9009, () => {
  console.log(`Server is running on local port 9009`)
});