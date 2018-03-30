const express = require('express');
const app = express();
const countriesData = require("./inforamation");


// const cors = require('cors')
// const path = require('path');
const port = 3001;

// app.set('port',8080);
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(cors());

const fixCORS = (res, req) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
};


app.options(["/searching-flights","/log-in-or-registration", "/settings","/setting-info"], (req,res) => {
  fixCORS(res, req);
  res.status(200).send();
});


app.get("/setting-info", (req,res,next) => {
  fixCORS(res, req);
  console.log("yes");
  if (countriesData.countries) {
    res.send({data: countriesData.countries});
  }
});


app.post(["/searching-flights","/log-in-or-registration","/settings"], (req,res) => {
  fixCORS(res, req);
  const receivedExpression = req.query;
  if (receivedExpression) {
    res.status(201).send(receivedExpression);
  } else {
    console.log("not foud");
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log("it works on " + port);
});