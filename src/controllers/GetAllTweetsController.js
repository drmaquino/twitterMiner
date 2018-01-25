// internal dependencies
GetAllTweets = require('../useCases/GetAllTweets');

// external dependencies

class GetAllTweetsController {

    constructor (factory) {
        this.factory = factory;
    }

    onGetAllTweets(req, res){
        const repo = this.factory.createTweetsRepository();

        const handler = {};
        handler.tweetsRetrieved = tweets => {
            res.send(tweets);
        };
        handler.tweetsRetrievalFailed = () => {
            res.send('error retrieving tweets');
        };

        const useCase = new GetAllTweets(repo, handler);
        useCase.start();
    }
};

module.exports = GetAllTweetsController;
