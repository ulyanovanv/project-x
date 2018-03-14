import express from 'express';
let app = express();
let port = 3001;

app.get('/', function(req, res){
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Sales History app listening on localhost://${port}`);
});