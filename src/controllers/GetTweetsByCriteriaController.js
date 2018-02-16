// internal dependencies
const GetTweetsByCriteria = require("../useCases/GetTweetsByCriteria");
const Tweet = require("../models/Tweet");

class GetTweetsByCriteriaController {

    constructor (factory) {
        this.factory = factory;
    }

    onGetTweetsByCriteria(req, res){
        const repo = this.factory.createTweetsRepository();

        const useCase = new GetTweetsByCriteria(repo, (error, tweets) => {
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
        const criteria = {
            "user.name" : req.query.username
        };
        useCase.start(criteria);
    }
};

module.exports = GetTweetsByCriteriaController;
