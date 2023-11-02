const mongoose = require('mongoose')
const Schema = mongoose.Schema


const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  // tracks up/down votes
upvoters: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}],
downvoters: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}],
issueVotes: {
  type: Number,
  default: 0
},
postDate: {
  type: Date,
  default: Date.now()
},
  user: {
    type: Schema.Types.ObjectId, 
    ref:"User",
    required: true
  },
  comment: [{
    // type: [String],
    // type: Array,
    required: false,
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = mongoose.model("Issue", issueSchema);