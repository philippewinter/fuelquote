const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

//Load Models
require('../models/Acft');
require("../models/Provider");
require("../models/Pilot");
const Acft = mongoose.model('acft');
const Provider = mongoose.model('provider');
const Pilot = mongoose.model('pilot');



//Aircraft Index route
router.get('/acft', ensureAuthenticated, (req, res) => {
  Acft.find({ user: req.user.id }).then(acft => {
    res.render('settings/acft/index', {
      acft: acft
    });
  });
});

//Provider Index route
router.get('/providers', ensureAuthenticated, (req, res) => {
  Provider.find({ user: req.user.id }).then(provider => {
    res.render('settings/providers/index', {
      provider: provider
    });
  });
});

//Pilot Index route
router.get('/pilot', ensureAuthenticated, (req, res) => {
  Pilot.find({ user: req.user.id }).then(pilot => {
    res.render('settings/pilot/index', {
      pilot: pilot
    });
  });
});

//Aircraft Add route
router.get('/acft/add', ensureAuthenticated, (req, res) => {
  res.render('settings/acft/add');
});

//Provider Add route
router.get('/providers/add', ensureAuthenticated, (req, res) => {
  res.render('settings/providers/add');
});

//Pilot Add route
router.get('/pilot/add', ensureAuthenticated, (req, res) => {
  res.render('settings/pilot/add');
});

//Aircraft edit form
router.get('/acft/edit/:id', ensureAuthenticated, (req, res) => {
  Acft.findOne({
    _id: req.params.id
  }).then(acft => {
  res.render('settings/acft/edit', {
    acft:acft
    });
  });
});

//Provider edit form
router.get('/providers/edit/:id', ensureAuthenticated, (req, res) => {
  Provider.findOne({
    _id: req.params.id
  }).then(provider => {
  res.render('settings/providers/edit', {
    provider: provider
    });
  });
});

//Pilot edit form
router.get('/pilot/edit/:id', ensureAuthenticated, (req, res) => {
  Pilot.findOne({
    _id: req.params.id
  }).then(pilot => {
  res.render('settings/pilot/edit', {
    pilot: pilot
    });
  });
});

//Process Aircraft form
router.post('/acft', (req, res) => {
  const newAcft = {
    tail: req.body.tail,
    type: req.body.type,
    user: req.user.id
  };
  new Acft(newAcft).save().then(acft => {
    res.redirect('/settings/acft');
  });
});

//Process Provider form
router.post('/provider', (req, res) => {
  const newProvider = {
    company: req.body.company,
    representative: req.body.representative,
    email: req.body.email,
    email2: req.body.email2,
    user: req.user.id
  };
  new Provider(newProvider).save().then(provider => {
    res.redirect('/settings/providers');
  });
});

//Process Pilot form
router.post('/pilot', (req, res) => {
  const newPilot = {
    name: req.body.name,
    email: req.body.email,
    user: req.user.id
  };
  new Pilot(newPilot).save().then(provider => {
    res.redirect('/settings/pilot');
  });
});

//Edit Aircraft Form Process
router.put('/acft/:id', (req, res) => {
  Acft.findOne({
    _id:req.params.id
  }).then(acft => {
    acft.tail = req.body.tail;
    acft.type = req.body.type;
    
    acft.save().then(acft => {
      res.redirect('/settings/acft');
    })
  }) 
});

//Edit Provider Form Process
router.put('/providers/:id', (req, res) => {
  Provider.findOne({
    _id:req.params.id
  }).then(provider => {
    provider.company = req.body.company,
    provider.representative = req.body.representative,
    provider.email = req.body.email,
    provider.email2 = req.body.email2
    
    provider.save().then(provider => {
      res.redirect('/settings/providers');
    })
  }) 
});

//Edit Pilot Form Process
router.put('/pilot/:id', (req, res) => {
  Pilot.findOne({
    _id:req.params.id
  }).then(pilot => {
    pilot.name = req.body.name,
    pilot.email = req.body.email
    
    pilot.save().then(pilot => {
      res.redirect('/settings/pilot');
    })
  }) 
});


//Delete Aircraft
router.delete('/acft/:id', (req, res) => {
  Acft.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.redirect('/settings/acft');
  });
});

//Delete Provider
router.delete('/providers/:id', (req, res) => {
  Provider.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.redirect('/settings/providers');
  });
});

//Delete Pilot
router.delete('/pilot/:id', (req, res) => {
  Pilot.deleteOne({
    _id: req.params.id
  }).then(() => {
    res.redirect('/settings/pilot');
  });
});

module.exports = router;
