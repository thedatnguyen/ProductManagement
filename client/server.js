const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'))

app.use(express.static(__dirname + '/src/pages'))
// sendFile will go here

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public' ,'/main.html'));
});
app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, '/src/pages' ,'/home.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);