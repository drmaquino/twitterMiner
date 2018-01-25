const TweetsRepository = require('../repositories/TweetsRepository');
const TwitterHelperForUsers = require("../helpers/TwitterHelperForUsers");
const TwitterHelperForApps = require("../helpers/TwitterHelperForApps");
const config = require("../../config.json");

class Factory {

    constructor () {
        this.repository = null;
        this.helper = null;
    }

    createTweetsRepository () {
        if (this.repository == null){
            this.repository = new TweetsRepository();
        }
        return this.repository;
    }

    createTwitterHelperForUsers () {
        if (!this.helper){
            const credentials = {
                consumer_key: config.CONSUMER_KEY,
                consumer_secret: config.CONSUMER_SECRET,
                access_token_key: config.ACCESS_TOKEN_KEY,
                access_token_secret:config.ACCESS_TOKEN_SECRET
            }
            this.helper = new TwitterHelperForUsers(credentials);
        }
        return this.helper;
    }

    createTwitterHelperForApps () {
        if (!this.helper){
            const credentials = {
                consumer_key: config.CONSUMER_KEY,
                consumer_secret: config.CONSUMER_SECRET,
                bearer_token: config.BEARER_TOKEN
            };
            this.helper = new TwitterHelperForApps(credentials);
        }
        return this.helper;
    }
}

module.exports = Factory;
