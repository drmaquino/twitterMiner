// internal dependencies
GetAllTweets = require("../useCases/GetAllTweets");

// external dependencies

class GetAllTweetsController {

    constructor (factory) {
        this.factory = factory;
    }

    onGetAllTweets(req, res){
        const repo = this.factory.createTweetsRepository();

        const presenter = {
            tweetsRetrieved: (tweets) => {
                res.send(tweets);
            },
            tweetsRetrievalFailed: () => {
                res.send("error retrieving tweets");
            }
        };

        const useCase = new GetAllTweets(repo, presenter);
        useCase.start();
    }
};

module.exports = GetAllTweetsController;
