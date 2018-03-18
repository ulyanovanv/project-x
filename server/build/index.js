const express = require('express');
const http = require("http");
const path = require('path');
const app = express();
app.set('port',8080);
app.use(express.static(path.join(__dirname, 'build')));

//Middleware
app.get('/', function (req, res, next) {
  if (req.url == "/"){
    return res.send('ping');
  } else {
    next();
  }
});
//a chain of requests can be done using next
app.get('/test', function (req, res, next) {
  if (req.url == "/test"){
    return res.send('test');
  } else {
    next();
  }
});
app.use(function(req,res){
  res.send(404, "404: page is not found");
});


app.listen(process.env.PORT || app.get('port'));