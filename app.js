const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override');

//Init app
const app = express();
const port = process.env.PORT;
const ip = process.env.IP;

//Load routes
const quotes = require('./routes/quotes');
const users = require('./routes/users');
const settings = require('./routes/settings');

//Passport config
require('./config/passport')(passport);

//Connect to Mogoose
mongoose
  .connect(
    'mongodb://' + ip + ':27017/aviation',
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log('MognoDB connected...'))
  .catch(err => console.log(err));

//Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Method Override Middleware
app.use(methodOverride('_method'));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Use routes
app.use('/quotes', quotes);
app.use('/users', users);
app.use('/settings', settings);

//Start Server
app.listen(port, () => console.log(`Server started on port ${port}!`));
