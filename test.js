// internal dependencies
const GetAllTweets = require('./src/useCases/GetAllTweets');
const SaveTweets = require('./src/useCases/SaveTweets')
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

//----------------------------------

// uses file system for storage
// testSaveTweetsToRepo();

testSaveTweetsInteractor();

//----------------------------------

// uses real connection to twitter!
// testTwitterForApps();

// use with caution:
// uses real connection to twitter!
// will block connections if there's too many attempts!
// testTwitterForUsers();

//=============================================================

function testGetTweetsFromRepo() {

    const repo = factory.createTweetsRepository();

    const handler = {
        onError: (err) => {
            console.log(color.red("GetTweetsFromRepo -> ERROR"));
        },
        onSuccess: (tweets) => {
            if (Tweet.areValid(tweets)) {
                console.log("GetTweetsFromRepo -> OK");
            } else {
                console.log(color.yellow("GetTweetsFromRepo -> INVALID OUTPUT"));
            }
        }
    };

    repo.getAllTweets(handler);
};

//=============================================================

function testGetAllTweetsInteractor() {

    const repo = mockFactory.createTweetsRepository();

    const presenter = {
        tweetsRetrievalFailed: () => {
            console.log(color.red("GetAllTweets interactor -> ERROR"));
        },
        tweetsRetrieved: (tweets) => {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets interactor -> OK");
            } else {
                console.log(color.yellow("GetAllTweets interactor -> INVALID OUTPUT"));
            }
        }
    };
    const interactor = new GetAllTweets(repo, presenter);
    interactor.start();
};

//==============================================================

function testGetAllTweetsController() {

    const controller = new GetAllTweetsController(mockFactory);

    const fakeReq = {};
    const fakeRes = {
        send: (tweets) => {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets controller -> OK");
            } else {
                console.log(color.yellow("GetAllTweets controller -> INVALID OUTPUT"));
            }
        }
    };
    controller.onGetAllTweets(fakeReq, fakeRes);
};

//=====================================================

function testGetAllTweetsRoute() {
    // setup server
    const app = express();
    const port = process.env.PORT || 3000;

    const tweetsRouter = express.Router();

    const controller = mockFactory.createGetAllTweetsController();

    tweetsRouter.get("/", (req, res) => {
        controller.onGetAllTweets(req, res);
    });

    app.use("/tweets", tweetsRouter);

    const server = app.listen(port);

    // begin test
    axios.get("http://localhost:3000/tweets")
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
        console.log(color.red("GetAllTweets route -> ERROR"));
    });
}

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//=============================================================

function testSaveTweetsToRepo() {

    const repo = factory.createTweetsRepository();

    const tweets = mockFactory.getSampleTweets();

    const handler = {
        onSuccess: () => {
            console.log("SaveTweetsToRepo -> OK");
        },
        onError: () => {
            console.log(color.red("SaveTweetsToRepo -> ERROR"));
        }
    };

    repo.saveTweets(tweets, handler);
}

//=============================================================

function testSaveTweetsInteractor() {
    const repo = mockFactory.createTweetsRepository();

    const presenter = {
        tweetsSaveFailed: () => {
            console.log(color.red("SaveTweets interactor -> ERROR"));
        },
        tweetsSaved: () => {
            console.log("SaveTweets interactor -> OK");
        }
    };

    const interactor = new SaveTweets(repo, presenter);

    const tweets = mockFactory.getSampleTweets();

    interactor.start(tweets);
}

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//=============================================================

function testTwitterForUsers() {

    const twitter = factory.createTwitterHelperForUsers();

    const filter = "javascript";

    const streamHandler = {
        onSuccess: (event) => {
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
        },
        onError: (error) => {
            console.log(color.red("TwitterForUsers helper -> ERROR"));
            // console.log(error);
        }
    }
    twitter.startStream(filter, streamHandler);
}

//==============================================================================

function testTwitterForApps() {

    const twitter = factory.createTwitterHelperForApps();

    const filter = "javascript";

    const fetchHandler = {
        onError: (err) => {
            // console.log(err);
            console.log(color.red("TwitterForApps helper -> ERROR"));
        },
        onSuccess: (tweets) => {
            // console.log(util.inspect(tweets, false, null));
            if (tweets.search_metadata && tweets.statuses) {
                console.log("TwitterForApps helper -> OK");
            } else {
                console.log(color.yellow("TwitterForApps helper -> INVALID OUTPUT"));
            }
        }
    };
    twitter.fetchTweets(filter, fetchHandler);
}

//===========================================================
