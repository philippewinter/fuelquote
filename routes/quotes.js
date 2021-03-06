const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

//Load Quote Model
require('../models/Quote');
const Quote = mongoose.model('quote');

//New Flight route
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('new_flight');
});

//Process Form
router.post('/', (req, res) => {
  console.log(req.body);

  const newFlight = {
    user: req.user.id,
    dt_flight: req.body.dt_flight,
    acft: req.body.acft,
    origin: req.body.origin,
    destination: req.body.destination,
    gal: req.body.gal,
    fbo: req.body.fbo
  };

  new Quote(newFlight).save().then(quote => {
    req.flash('success_msg', 'Flight has been added!');
    res.redirect('/quotes');
  });
});

module.exports = router;
