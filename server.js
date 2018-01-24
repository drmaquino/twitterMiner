// internal dependencies
const GetAllTweetsController = require('./src/controllers/GetAllTweetsController');
const Factory = require('./src/factories/Factory');

// external dependencies
const express = require('express');

// express init and config
const app = express();
const port = process.env.PORT || 3000;

// components instantiation
const factory = new Factory();
const controller = new GetAllTweetsController(factory);

// routes
app.route('/').get((req, res) => controller.onGetAllTweets(req,res));

// start listening
app.listen(port);
console.log('twitter data miner RESTful API server started on: ' + port);
