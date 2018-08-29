const express = require('express');
const path = require('path');
//Init app
const app = express();

//Load view
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//Home route
app.get('/pages', function (req, res) {
    res.render('new_flight');
  });

  //Start Server
  app.listen(3000, () => console.log('Server started on port 3000!'));
