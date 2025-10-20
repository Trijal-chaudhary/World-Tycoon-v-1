const mongoose = require('mongoose')

const playerDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("PlayerDetails", playerDetailsSchema);