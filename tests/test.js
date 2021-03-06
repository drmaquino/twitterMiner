// internal dependencies
const GetAllTweets = require('../src/useCases/GetAllTweets');
const GetTweetsByCriteria = require('../src/useCases/GetTweetsByCriteria');
const SaveTweet = require('../src/useCases/SaveTweet')
const MineTweets = require('../src/useCases/MineTweets');
const GetAllTweetsController = require('../src/controllers/GetAllTweetsController');
const GetTweetsByCriteriaController = require('../src/controllers/GetTweetsByCriteriaController');

const Factory = require('../src/factories/Factory');
const MockFactory = require('../src/factories/MockFactory');

const Tweet = require('../src/models/Tweet');
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
//----------------------------------

// uses file system for storage
testGetTweetsFromRepo();

testGetAllTweetsInteractor();

testGetAllTweetsController();

// uses internet cnx (fake internals)
testGetAllTweetsRoute();

//----------------------------------
//----------------------------------

testGetTweetsByCriteriaFromRepo();

testGetTweetsByCriteriaInteractor();

testGetTweetsByCriteriaController();

// uses internet cnx (fake internals)
testGetTweetsByCriteriaRoute()

//----------------------------------

// use with caution:
// uses real connection to twitter!
// testTwitterForApps();

// will block connections if there's too many attempts!
// testTwitterForUsers();

// testMineTweetsInteractor();

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//=============================================================

function testSaveTweetToRepo() {

    const repo = factory.createTweetsRepository();

    const tweet = mockFactory.getSampleTweet();
    const tweets = mockFactory.getSampleTweets();

    repo.connect((err) => {
        if (err) {
            throw err;
        } else {
            repo.saveTweet(tweets[0], (error) => {
                if (error) {
                    console.log(color.red("SaveTweetToRepo -> ERROR"));
                } else {
                    console.log("SaveTweetToRepo -> OK 1");
                }
            });
            repo.saveTweet(tweets[1], (error) => {
                if (error) {
                    console.log(color.red("SaveTweetToRepo -> ERROR"));
                } else {
                    console.log("SaveTweetToRepo -> OK 2");
                }
            });
        }
    });
}

//=============================================================

function testSaveTweetInteractor() {
    const repo = mockFactory.createTweetsRepository();

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

    repo.connect((err) => {
        if (err) {
            throw err;
        } else {
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
        }
    });
};

//=============================================================

function testGetAllTweetsInteractor() {

    const repo = mockFactory.createTweetsRepository();

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

function testGetTweetsByCriteriaFromRepo() {

    const repo = mockFactory.createTweetsRepository();
    const criteria = { "user.name" : "John Doe" };

    repo.connect((err) => {
        if (err) {
            throw err;
        } else {
            repo.getTweetsByCriteria(criteria, (error, tweets) => {
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
        }
    });
};

//=============================================================

function testGetTweetsByCriteriaInteractor() {

    const repo = mockFactory.createTweetsRepository();
    const criteria = {};

    const interactor = new GetTweetsByCriteria(repo, (error, tweets) => {
        if (error) {
            console.log(color.red("GetTweetsByCriteria interactor -> ERROR"));
        } else {
            if (Tweet.areValid(tweets)) {
                console.log("GetTweetsByCriteria interactor -> OK");
            } else {
                console.log(color.yellow("GetTweetsByCriteria interactor -> INVALID OUTPUT"));
            }
        }
    });

    interactor.start(criteria);
}

//==============================================================

function testGetTweetsByCriteriaController() {

    const controller = new GetTweetsByCriteriaController(mockFactory);

    const fakeReq = {
                query : {
            username : "John Doe"
        }
    };
    const fakeRes = {
        send: (tweets) => {
            if (Tweet.areValid(tweets)) {
                console.log("GetAllTweets controller -> OK");
            } else {
                console.log(color.yellow("GetAllTweets controller -> INVALID OUTPUT"));
            }
        }
    };
    controller.onGetTweetsByCriteria(fakeReq, fakeRes);
};

//=====================================================

function testGetTweetsByCriteriaRoute() {
    // setup server
    const app = express();
    const port = 4000;//config.port;

    const controller = mockFactory.createGetTweetsByCriteriaController();

    const tweetsRouter = express.Router();

    tweetsRouter.get("/tweets", (req, res) => {
        controller.onGetTweetsByCriteria(req, res);
    });

    app.use("/", tweetsRouter);

    const server = app.listen(port);

    // begin test
    axios.get("http://localhost:4000/tweets?username=John%20Doe")
    .then((response) => {
        const tweets = response.data;
        if (tweets) {
            if (Tweet.areValid(tweets)) {
                console.log("GetTweetsByCriteria route -> OK");
            } else {
                console.log(color.yellow("GetTweetsByCriteria route -> INVALID OUTPUT"));
            }
        } else {
            console.log("GetTweetsByCriteria route -> OK (but no data retrieved)");
        }
        server.close();
    })
    .catch((error) => {
        console.log(color.red("GetTweetsByCriteria route -> ERROR"));
    });
}

//=============================================================
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//=============================================================


function testTwitterForUsers() {

    const twitter = factory.createTwitterHelperForUsers();

    const filter = "javascript";

    twitter.startStream(filter, (error, event) => {
        if (error) {
            console.log(color.red("TwitterForUsers helper -> ERROR"));
        } else {
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
        }
    });
}

//==============================================================================

function testTwitterForApps() {

    const twitter = factory.createTwitterHelperForApps();

    const filter = "javascript";

    twitter.fetchTweets(filter, (error, tweets) => {
        if (error) {
            console.log(color.red("TwitterForApps helper -> ERROR"));
        } else {
            if (tweets.search_metadata && tweets.statuses) {
                console.log("TwitterForApps helper -> OK");
            } else {
                console.log(color.yellow("TwitterForApps helper -> INVALID OUTPUT"));
            }
        }
    });
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
