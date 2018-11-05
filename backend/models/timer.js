const mongoose = require("mongoose");

const timerSchema = mongoose.Schema({

  timesequence: {
    type: String,

  }




});

module.exports = mongoose.model("Timer", timerSchema);
