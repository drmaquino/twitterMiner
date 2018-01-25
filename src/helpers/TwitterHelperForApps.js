// external dependencies
const Twitter = require("twitter");

class TwitterHelperForApps {

    constructor (credentials) {
        this.client = new Twitter(credentials);
    }

    fetchTweets (filter, handler) {
        const endPoint = "search/tweets";

        const encodedFilter = encodeURI(filter);

        this.client.get(endPoint, {q: encodedFilter}, function(err, tweets, response){
            if (err){
                handler.onError(err);
            } else {
                handler.onSuccess(tweets);
            }
        });
    }
}

module.exports = TwitterHelperForApps;
