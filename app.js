const express = require('express');
const exphbs = require('express-handlebars');

//Init app
const app = express();
const port = 3000;

//Bower
app.use(express.static(__dirname + '/public'));

//Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Home route
app.get('/', function(req, res) {
  res.render('new_flight');
});

//Start Server
app.listen(port, () => console.log(`Server started on port ${port}!`));
