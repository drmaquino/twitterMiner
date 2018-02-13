// internal dependencies
const GetAllTweets = require('../src/useCases/GetAllTweets');
const SaveTweet = require('../src/useCases/SaveTweet')
const MineTweets = require('../src/useCases/MineTweets');

const GetAllTweetsController = require('../src/controllers/GetAllTweetsController');

const Factory = require('../src/factories/Factory');
const MockFactory = require('../src/factories/MockFactory');

const Tweet = require('../src/models/Tweet');
const credentials = require("../credentials.json");
const config = require("../config");

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

// uses file system or MongoDB for storage
testSaveTweetToRepo();

testSaveTweetInteractor();

//----------------------------------

// uses file system for storage
testGetTweetsFromRepo();

testGetAllTweetsInteractor();

testGetAllTweetsController();

// uses internet cnx (fake internals)
testGetAllTweetsRoute();

//----------------------------------

// use with caution:
// uses real connection to twitter!
// testTwitterForApps();

// will block connections if there's too many attempts!
// testTwitterForUsers();

testMineTweetsInteractor();

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//=============================================================

function testSaveTweetToRepo() {

    const repo = factory.createTweetsRepository();

    const tweet = mockFactory.getSampleTweet();

    repo.connect((err) => {
        if (err) {
            throw err;
        } else {
            repo.saveTweet(tweet, (error) => {
                if (error) {
                    console.log(color.red("SaveTweetToRepo -> ERROR"));
                } else {
                    console.log("SaveTweetToRepo -> OK");
                }
            });
        }
    });
}

//=============================================================

function testSaveTweetInteractor() {
    const repo = mockFactory.createTweetsRepository();

    const handler = {
        tweetsSaveFailed: () => {
            console.log(color.red("SaveTweet interactor -> ERROR"));
        },
        tweetsSaved: () => {
            console.log("SaveTweet interactor -> OK");
        }
    };

    const interactor = new SaveTweet(repo, (error) => {
        if (error) {
            console.log(color.red("SaveTweet interactor -> ERROR"));
        } else {
            console.log("SaveTweet interactor -> OK");
        }
    });

    const tweet = mockFactory.getSampleTweet();

    interactor.start(tweet);
}

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

    repo.getAllTweets((error, tweets) => {
        if (error) {
            console.log(color.red("GetTweetsFromRepo -> ERROR"));
        } else {
            if (Tweet.areValid(tweets)) {
                console.log("GetTweetsFromRepo -> OK");
            } else {
                console.log(color.yellow("GetTweetsFromRepo -> INVALID OUTPUT"));
            }
        }
    });
};

//=============================================================

function testGetAllTweetsInteractor() {

    const repo = mockFactory.createTweetsRepository();

    const handler = {
        tweetsRetrieved: (tweets) => {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets interactor -> OK");
            } else {
                console.log(color.yellow("GetAllTweets interactor -> INVALID OUTPUT"));
            }
        },
        tweetsRetrievalFailed: () => {
            console.log(color.red("GetAllTweets interactor -> ERROR"));
        }
    };

    const interactor = new GetAllTweets(repo, (error, tweets) => {
        if (error) {
            console.log(color.red("GetAllTweets interactor -> ERROR"));
        } else {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets interactor -> OK");
            } else {
                console.log(color.yellow("GetAllTweets interactor -> INVALID OUTPUT"));
            }
        }
    });

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
    const port = config.port;

    const controller = mockFactory.createGetAllTweetsController();

    const tweetsRouter = express.Router();
    tweetsRouter.get("/", (req, res) => {
        controller.onGetAllTweets(req, res);
    });

    app.use("/tweets", tweetsRouter);

    const server = app.listen(port);

    // begin test
    axios.get("http://localhost:3000/tweets")
    .then((response) => {
        const tweets = response.data;
        if (tweets) {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets route -> OK");
            } else {
                console.log(color.yellow("GetAllTweets route -> INVALID OUTPUT"));
            }
        } else {
            console.log("GetAllTweets route -> OK (but no data retrieved)");
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
        },
        onError: (error) => {
            console.log(color.red("TwitterForUsers helper -> ERROR"));
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
            console.log(color.red("TwitterForApps helper -> ERROR"));
        },
        onSuccess: (tweets) => {
            if (tweets.search_metadata && tweets.statuses) {
                console.log("TwitterForApps helper -> OK");
            } else {
                console.log(color.yellow("TwitterForApps helper -> INVALID OUTPUT"));
            }
        }
    };
    twitter.fetchTweets(filter, fetchHandler);
}

//==============================================================================

function testMineTweetsInteractor() {

    const twitterHelper = mockFactory.createTwitterHelperForUsers();
    const repo = factory.createTweetsRepository();
    const mineTweets = new MineTweets(twitterHelper, repo);

    const filter = "javascript";

    mineTweets.start(filter);
}

//===========================================================
