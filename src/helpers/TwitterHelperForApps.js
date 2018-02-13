// external dependencies
const Twitter = require("twitter");

class TwitterHelperForApps {

    constructor(credentials) {
        this.client = new Twitter(credentials);
    }

    fetchTweets(filterCriteria, callback) {
        const endPoint = "search/tweets";

        const encodedFilter = encodeURI(filterCriteria);

        const filter = {q: encodedFilter};

        this.client.get(endPoint, filter, (error, tweets, response) => {
            if (err){
                callback(error);
            } else {
                callback(null, tweets);
            }
        });
    }
}

module.exports = TwitterHelperForApps;
