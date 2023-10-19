const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt') // 15.1


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})
// 15.1 - pre-saved hook to ecrypt user password on signup
userSchema.pre("save", function (next) { // need to use function and not () => annonymous function bc I need to access    .this
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err)
    user.password = hash
    next()
  })
});

// 16. methof to check encrypt password on login
userSchema.methods.checkPassword = function(passwordAttempt, callback){
  bcrypt.compare(passwordAttempt,  this.password, (err, isMatch) => {
    if(err) callback(err)
    return callback(null, isMatch)
  })
};
// 17.
userSchema.methods.withoutPassword = function(){
  const user = this.toObject()
  delete user.password
  return user
}

module.exports = mongoose.model("User", userSchema)