const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var authRoutes = require("./routes/auth");
var userRoutes = require("./routes/user");
var tweetsRoutes = require("./routes/tweets");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', authRoutes);
app.use('/', userRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});