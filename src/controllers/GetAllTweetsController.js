// internal dependencies
const GetAllTweets = require("../useCases/GetAllTweets");
const Tweet = require("../models/Tweet");

class GetAllTweetsController {

    constructor (factory) {
        this.factory = factory;
    }

    onGetAllTweets(req, res){
        const repo = this.factory.createTweetsRepository();

        const useCase = new GetAllTweets(repo, (error, tweets) => {
            if (error) {
                res.send("error retrieving tweets");
            } else {
                if (Tweet.areValid(tweets)) {
                    res.send(tweets);
                } else {
                    res.send("error parsing tweets");
                }
            }
        });

        useCase.start();
    }
};

module.exports = GetAllTweetsController;
