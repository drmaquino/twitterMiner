// internal dependencies
const TweetsFileRepository = require("../repositories/TweetsFileRepository");
const TweetsMongoRepository = require("../repositories/TweetsMongoRepository");
const TweetsVolatileRepository = require("../repositories/TweetsVolatileRepository");
const MineTweets = require("../useCases/MineTweets");
const TwitterHelperForUsers = require("../helpers/TwitterHelperForUsers");
const TwitterHelperForApps = require("../helpers/TwitterHelperForApps");
const config = require("../../config");

class Factory {

    constructor () {
        this.repository = null;
        this.helperForApps = null;
        this.helperForUsers = null;
    }

    createTweetsRepository () {
        if (this.repository == null) {
            // this.repository = new TweetsVolatileRepository();
            this.repository = new TweetsFileRepository();
            // this.repository = new TweetsMongoRepository();
        }
        return this.repository;
    }

    createMineTweets () {
        const helper = this.createTwitterHelperForUsers();
        const repo = this.createTweetsRepository();

        const mineTweets = new MineTweets(helper, repo);
        return mineTweets;
    }

    createTwitterHelperForUsers () {
        if (!this.helperForUsers) {
            const credentials = {
                consumer_key: config.twitterAPI.CONSUMER_KEY,
                consumer_secret: config.twitterAPI.CONSUMER_SECRET,
                access_token_key: config.twitterAPI.ACCESS_TOKEN_KEY,
                access_token_secret:config.twitterAPI.ACCESS_TOKEN_SECRET
            }
            this.helperForUsers = new TwitterHelperForUsers(credentials);
        }
        return this.helperForUsers;
    }

    createTwitterHelperForApps () {
        if (!this.helperForApps) {
            const credentials = {
                consumer_key: config.twitterAPI.CONSUMER_KEY,
                consumer_secret: config.twitterAPI.CONSUMER_SECRET,
                bearer_token: config.twitterAPI.BEARER_TOKEN
            };
            this.helperForApps = new TwitterHelperForApps(credentials);
        }
        return this.helperForApps;
    }
}

module.exports = Factory;
