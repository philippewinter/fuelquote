const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const QuoteSchema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  dt_quote: {
    type: Date,
    default: Date.now
  },
  dt_flight: {
    type: Date,
    required: true
  },
  acft: {
    type: String,
    required: true
  },
  pilot: {
    type: String
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  gal: {
    type: Number
  },
  fbo: {
    type: String
  },
  provider: {
    type: String
  },
  price: {
    type: Number
  }
});

mongoose.model('quote', QuoteSchema);
