// internal dependencies
const TweetsRepository = require('./src/repositories/TweetsRepository');
const getAllTweets = require('./src/useCases/GetAllTweets');
const GetAllTweetsController = require('./src/controllers/GetAllTweetsController');
const MockFactory = require('./src/factories/MockFactory');
const Tweet = require('./src/models/Tweet');

// external dependencies
const axios = require('axios');
const _ = require('lodash');
const color = require('chalk');

//==================================================

testGetTweetsFromRepo();

testGetAllTweetsInteractor();

testGetAllTweetsController();

testEndToEnd();

//==================================================

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
    const express = require('express');
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

//=============================================================
