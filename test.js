// internal dependencies
const getAllTweets = require('./src/useCases/GetAllTweets');
const GetAllTweetsController = require('./src/controllers/GetAllTweetsController');
const Factory = require('./src/factories/Factory');
const MockFactory = require('./src/factories/MockFactory');
const Tweet = require('./src/models/Tweet');
const config = require("./config.json");

// external dependencies
const axios = require('axios');
const _ = require('lodash');
const color = require('chalk');
const util = require('util');
const express = require("express");

//=============================================================

const factory = new Factory();
const mockFactory = new MockFactory();

//==================================================

// uses file system for storage
testGetTweetsFromRepo();

testGetAllTweetsInteractor();

testGetAllTweetsController();

// uses internet cnx (fake internals)
testGetAllTweetsRoute();

// uses real connection to twitter!
// testTwitterForApps();

// use with caution:
// uses real connection to twitter!
// will block connections if there's too many attempts!
// testTwitterForUsers();

//=============================================================

function testGetTweetsFromRepo() {

    const repo = factory.createTweetsRepository();

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

    const repo = mockFactory.createTweetsRepository();

    const handler = {};
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
    const interactor = new GetAllTweets(repo, handler);
    interactor.start();
};

//==============================================================

function testGetAllTweetsController() {

    const controller = new GetAllTweetsController(mockFactory);

    const fakeReq = {};
    const fakeRes = {};
    fakeRes.send = (tweets) => {
        if (Tweet.areValid(tweets)) {
            console.log("GetAllTweets controller -> OK");
        } else {
            console.log(color.yellow("GetAllTweets controller -> INVALID OUTPUT"));
        }
    };
    controller.onGetAllTweets(fakeReq, fakeRes);
};

//=====================================================

function testGetAllTweetsRoute() {
    // setup server
    const app = express();
    const port = process.env.PORT || 3000;

    const controller = mockFactory.createGetAllTweetsController();

    app.route('/').get((req, res) => {
        controller.onGetAllTweets(req, res);
    });

    const server = app.listen(port);

    // begin test
    axios.get("http://localhost:3000")
    .then(response => {
        const tweets = response.data;
        if (tweets) {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets route -> OK");
            } else {
                console.log(color.yellow("GetAllTweets route -> INVALID OUTPUT"));
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

    const twitter = factory.createTwitterHelperForUsers();

    const filter = "javascript";

    const streamHandler = {};
    streamHandler.onSuccess = (event) => {
        if (event.text) {
            if (event.text.toLowerCase().includes(filter)) {
                console.log("TwitterForUsers helper -> MATCHING EVENT RECEIVED");
            } else {
                console.log(color.yellow("TwitterForUsers helper -> NO MATCH"));
            }
            console.log(event.text);
            console.log("\n//===//\n");
        } else {
            console.log(color.yellow("TwitterForUsers helper -> INVALID EVENT"));
        }
        // console.log(util.inspect(event, false, null));
    };
    streamHandler.onError = (error) => {
        console.log(color.red("TwitterForUsers helper -> ERROR"));
        // console.log(error);
    };
    twitter.startStream(filter, streamHandler);
}

//==============================================================================

function testTwitterForApps() {

    const twitter = factory.createTwitterHelperForApps();

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
