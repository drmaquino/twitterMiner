// internal dependencies
GetAllTweets = require('../useCases/GetAllTweets');

// external dependencies

class GetAllTweetsController {

    constructor (factory) {
        this.factory = factory;
    }

    onGetAllTweets(req, res){
        let repo = this.factory.createTweetsRepository();

        let handler = {};
        handler.tweetsRetrieved = tweets => {
            res.send(tweets);
        };
        handler.tweetsRetrievalFailed = () => {
            res.send('error retrieving tweets');
        };

        let useCase = new GetAllTweets(repo, handler);
        useCase.start();
    }
};

module.exports = GetAllTweetsController;
