// external dependencies
const Twitter = require("twitter");

class TwitterHelper {

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

    startStream (filter, handler) {
        const endPoint = "statuses/filter";

        const encodedFilter = encodeURI(filter);

        const criteria = {
            track: encodedFilter
        };

        const stream = this.client.stream(endPoint, criteria);

        stream.on("data", function(event) {
            handler.onSuccess(event);
        });

        stream.on("error", function(error) {
            handler.onError(error);
        });
    }
}

module.exports = TwitterHelper;
