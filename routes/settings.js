const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

//Load Acft Model
require('../models/Acft');
const Acft = mongoose.model('acft');

//Aircraft Index route
router.get('/acft', ensureAuthenticated, (req, res) => {
  Acft.find({ user: req.user.id }).then(acft => {
    res.render('acft/index', {
      acft: acft
    });
  });
});

//Aircraft Add route
router.get('/acft/add', ensureAuthenticated, (req, res) => {
  res.render('acft/add');
});

//Process Aircraft form
router.post('/', (req, res) => {
  const newAcft = {
    tail: req.body.tail,
    type: req.body.type,
    user: req.user.id
  };
  new Acft(newAcft).save().then(acft => {
    res.redirect('/settings/acft');
  });
});

module.exports = router;
