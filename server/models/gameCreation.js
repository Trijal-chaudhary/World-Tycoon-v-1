const mongoose = require('mongoose');

const createdGamesSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  host: {
    type: Object,
    required: true
  },
  players: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("createdGames", createdGamesSchema)