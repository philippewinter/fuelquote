const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PilotSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

mongoose.model('pilot', PilotSchema);
