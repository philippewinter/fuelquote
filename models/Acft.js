const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AcftSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  tail: {
    type: String,
    required: true
  },
  type: {
    type: String
  }
});

mongoose.model('acft', AcftSchema);
