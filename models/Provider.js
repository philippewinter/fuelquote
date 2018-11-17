const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProviderSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  representative: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  email2: {
    type: String
  }
});

mongoose.model('provider', ProviderSchema);
