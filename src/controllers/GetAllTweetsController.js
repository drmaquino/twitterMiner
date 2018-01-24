// internal dependencies
GetAllTweets = require('../useCases/GetAllTweets');

// external dependencies
// const Twitter = require('twitter');

class GetAllTweetsController {

    constructor (factory) {
        this.factory = factory;
        // this.client = new Twitter({
        //     consumer_key: "FarRAIgvRpc8kNv5n9gLcvTO4",
        //     consumer_secret: "iwGrujzzqPGV1GbSpagVfUMNQ0BklY1tA3eQZDGPrBbHjVqbDV",
        //     access_token_key: "2752102411-ht5jkkirIo5piUV7ux7d5kKuKcekg3NwjcP9mMD",
        //     access_token_secret:"18N6DBBDJWEDLnoxwMGKhxTWF7VgQGrJuU5rvd1Da5PZ3"
        // });
    }

    // onFetchTweets() {
    //     this.client.get('search/tweets', {q: "javascript"}, function(err, favs, response){
    //         if (err){
    //             onError(err);
    //         } else {
    //             onSuccess(favs);
    //         }
    //     });
    // }

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
