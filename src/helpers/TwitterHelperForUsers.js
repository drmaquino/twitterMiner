// external dependencies
const Twitter = require("twitter");

class TwitterHelperForUsers {

    constructor (credentials) {
        this.client = new Twitter(credentials);
    }

    fetchTweets (filter, callback) {
        const endPoint = "search/tweets";

        const encodedFilter = encodeURI(filter);

        this.client.get(endPoint, {q: encodedFilter}, (error, tweets, response) =>{
            if (error) {
                callback(error);
            } else {
                callback(null, tweets);
            }
        });
    }

    startStream (filter, callback) {
        const endPoint = "statuses/filter";

        const encodedFilter = encodeURI(filter);

        const criteria = {
            track: encodedFilter
        };

        const stream = this.client.stream(endPoint, criteria);

        stream.on("data", function(event) {
            callback(null, event);
        });

        stream.on("erroror", function(erroror) {
            callback(error);
        });
    }
}

module.exports = TwitterHelperForUsers;
