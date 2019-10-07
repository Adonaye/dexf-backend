const express = require('express');
const app = express();

var authRoutes = require("./routes/auth");

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', authRoutes);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});