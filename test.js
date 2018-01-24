// internal dependencies
const TweetsRepository = require('./src/repositories/TweetsRepository');
const getAllTweets = require('./src/useCases/GetAllTweets');
const GetAllTweetsController = require('./src/controllers/GetAllTweetsController');
const MockFactory = require('./src/factories/MockFactory');
const Tweet = require('./src/models/Tweet');
const TwitterHelper = require("./src/helpers/TwitterHelper");
const config = require("./config.json");

// external dependencies
const axios = require('axios');
const _ = require('lodash');
const color = require('chalk');
const util = require('util');

//==================================================

// testGetTweetsFromRepo();

// testGetAllTweetsInteractor();

// testGetAllTweetsController();

// testEndToEnd();

// testTwitterForApps();

// // use with caution:
// // will block connections if there's too many attempts!
// // testTwitterForUsers();

//=============================================================

function testGetTweetsFromRepo() {

    let repo = new TweetsRepository();

    onError = (err) => {
        console.log(color.red("TweetsRepository -> ERROR"));
    };

    onSuccess = (tweets) => {
        if (Tweet.areValid(tweets)) {
            console.log("TweetsRepository -> OK");
        } else {
            console.log(color.yellow("TweetsRepository -> INVALID OUTPUT"));
        }
    };

    repo.getAllTweets(onError, onSuccess);
};

//=============================================================

function testGetAllTweetsInteractor() {

    let mockFactory = new MockFactory();
    let repo = mockFactory.createTweetsRepository();

    let handler = {};
    handler.tweetsRetrievalFailed = () => {
        console.log(color.red("GetAllTweets interactor -> ERROR"));
    };
    handler.tweetsRetrieved = (tweets) => {
        if (Tweet.areValid(tweets)) {
            console.log("GetAllTweets interactor -> OK");
        } else {
            console.log(color.yellow("GetAllTweets interactor -> INVALID OUTPUT"));
        }
    }
    let interactor = new GetAllTweets(repo, handler);
    interactor.start();
};

//==============================================================

function testGetAllTweetsController() {

    let mockFactory = new MockFactory();
    let controller = new GetAllTweetsController(mockFactory);

    let req = {};
    let res = {};
    res.send = (tweets) => {
        if (Tweet.areValid(tweets)) {
            console.log("GetAllTweets controller -> OK");
        } else {
            console.log(color.yellow("GetAllTweets controller -> INVALID OUTPUT"));
        }
    }
    controller.onGetAllTweets(req, res);
};

//=====================================================

function testEndToEnd() {
    const express = require("express");
    const app = express();
    const port = process.env.PORT || 3000;

    const mockFactory = new MockFactory();
    const controller = new GetAllTweetsController(mockFactory);

    app.route('/').get((req, res) => controller.onGetAllTweets(req,res));

    const server = app.listen(port);

    //---//

    axios.get("http://localhost:3000")
    .then(response => {
        let tweets = response.data;
        if (tweets) {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets use case -> OK");
            } else {
                console.log(color.yellow("GetAllTweets use case -> INVALID OUTPUT"));
            }
        }
        server.close();
    })
    .catch((error) => {
        console.log(color.red("GetAllTweets use case -> ERROR"));
    });
}

//==============================================================================

function testTwitterForUsers() {
    const credentials = {
        consumer_key: config.CONSUMER_KEY,
        consumer_secret: config.CONSUMER_SECRET,
        access_token_key: config.ACCESS_TOKEN_KEY,
        access_token_secret:config.ACCESS_TOKEN_SECRET
    }

    const twitter = new TwitterHelper(credentials);

    const filter = "javascript";

    const streamHandler = {};
    streamHandler.onSuccess = (event) => {
        console.log(util.inspect(event, false, null));
        console.log("\n//===//\n");
    }

    streamHandler.onError = (error) => {
        // console.log(error);
        console.log(color.red("TwitterForUsers helper -> ERROR"));
    }

    twitter.startStream(filter, streamHandler);
}

//==============================================================================

function testTwitterForApps() {
    const credentials = {
        consumer_key: config.CONSUMER_KEY,
        consumer_secret: config.CONSUMER_SECRET,
        bearer_token: config.BEARER_TOKEN
    };

    const twitter = new TwitterHelper(credentials);

    const filter = "javascript";

    const fetchHandler = {};
    fetchHandler.onError = (err) => {
        // console.log(err);
        console.log(color.red("TwitterForApps helper -> ERROR"));
    };
    fetchHandler.onSuccess = (tweets) => {
        // console.log(util.inspect(tweets, false, null));
        if (tweets.search_metadata && tweets.statuses) {
            console.log("TwitterForApps helper -> OK");
        } else {
            console.log(color.yellow("TwitterForApps helper -> INVALID OUTPUT"));
        }
    };

    twitter.fetchTweets(filter, fetchHandler);
}

//===========================================================
