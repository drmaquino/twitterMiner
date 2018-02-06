// external dependencies
const Twitter = require("twitter");

class TwitterHelperForApps {

    constructor(credentials) {
        this.client = new Twitter(credentials);
    }

    fetchTweets(filterCriteria, handler) {
        const endPoint = "search/tweets";

        const encodedFilter = encodeURI(filterCriteria);

        const filter = {q: encodedFilter};

        const callback = (err, tweets, response) => {
            if (err){
                handler.onError(err);
            } else {
                handler.onSuccess(tweets);
            }
        };

        this.client.get(endPoint, filter, callback);
    }
}

module.exports = TwitterHelperForApps;
