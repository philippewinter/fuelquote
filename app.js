const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Init app
const app = express();
const port = 3000;

//Connect to Mogoose
mongoose
  .connect(
    'mongodb://localhost/aviation',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MognoDB connected...'))
  .catch(err => console.log(err));

//Load Quote Model
require('./models/Quote');
const Quote = mongoose.model('quote');

//Bower
app.use(express.static(__dirname + '/public'));

//Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Home route
app.get('/', function(req, res) {
  res.render('new_flight');
});

//Process Form
app.post('/', (req, res) => {
  console.log(req.body);

  const newUser = {
    dt_flight: req.body.dt_flight,
    acft: req.body.acft,
    origin: req.body.origin,
    destination: req.body.destination,
    gal: req.body.gal,
    fbo: req.body.fbo
  };
  new Quote(newUser).save().then(quote => {
    res.redirect('/quotes');
  });
});

//Start Server
app.listen(port, () => console.log(`Server started on port ${port}!`));
