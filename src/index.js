import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import './App.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();


// var express = require('express');
// var app = express();
//
// app.get('/', function(req, res){
//   res.send("Hello world!");
// });
//
// app.listen(3000);