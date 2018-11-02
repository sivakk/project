const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
  issuename: {
    type: String,

  },
  issuecontent: {
    type: String,

  },




});

module.exports = mongoose.model("Issue", issueSchema);
