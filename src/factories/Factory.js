const TweetsFileRepository = require('../repositories/TweetsFileRepository');
const TweetsMongoRepository = require('../repositories/TweetsMongoRepository');
const TwitterHelperForUsers = require("../helpers/TwitterHelperForUsers");
const TwitterHelperForApps = require("../helpers/TwitterHelperForApps");
const config = require("../../config.json");

class Factory {

    constructor () {
        this.repository = null;
        this.helperForApps = null;
        this.helperForUsers = null;
    }

    createTweetsRepository () {
        if (this.repository == null) {
            // this.repository = new TweetsFileRepository();
            this.repository = new TweetsMongoRepository();
        }
        return this.repository;
    }

    createTwitterHelperForUsers () {
        if (!this.helperForUsers) {
            const credentials = {
                consumer_key: config.CONSUMER_KEY,
                consumer_secret: config.CONSUMER_SECRET,
                access_token_key: config.ACCESS_TOKEN_KEY,
                access_token_secret:config.ACCESS_TOKEN_SECRET
            }
            this.helperForUsers = new TwitterHelperForUsers(credentials);
        }
        return this.helperForUsers;
    }

    createTwitterHelperForApps () {
        if (!this.helperForApps) {
            const credentials = {
                consumer_key: config.CONSUMER_KEY,
                consumer_secret: config.CONSUMER_SECRET,
                bearer_token: config.BEARER_TOKEN
            };
            this.helperForApps = new TwitterHelperForApps(credentials);
        }
        return this.helperForApps;
    }
}

module.exports = Factory;
