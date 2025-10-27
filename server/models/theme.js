const mongoose = require('mongoose')

const ThemeDetailsSchema = new mongoose.Schema({
  Theme: {
    type: Object,
  }
})

module.exports = mongoose.model("Themes", ThemeDetailsSchema);