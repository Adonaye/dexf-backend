const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

var authRoutes = require("./routes/auth");
var userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
    .catch(err => console.log(JSON.stringify(err)));


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', authRoutes);
app.use('/', userRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});