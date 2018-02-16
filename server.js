// internal dependencies
// const GetAllTweetsController = require("./src/controllers/GetAllTweetsController");
const GetTweetsByCriteriaController = require("./src/controllers/GetTweetsByCriteriaController");
const Factory = require("./src/factories/Factory");
const config = require("./config.js");

// external dependencies
const express = require("express");

// express init and config
const app = express();
const port = process.env.PORT || 3000;

// components instantiation
const factory = new Factory();
// const controller = new GetAllTweetsController(factory);
const repo = factory.createTweetsRepository();
const controller = new GetTweetsByCriteriaController(factory);


// establish connection to mongodb atlas
repo.connect((err) => {
    if (err) {
        throw err;
    } else {
        // routes
        // app.route("/tweets").get((req, res) => controller.onGetAllTweets(req,res));
        app.route("/tweets").get((req, res) => controller.onGetTweetsByCriteria(req,res));

        // start listening
        app.listen(port);
        console.log("twitter data miner RESTful API server started on: " + port);
    }
});



