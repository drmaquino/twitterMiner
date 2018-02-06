// external dependencies
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

// constants
const ENCODING = 'utf-8';

class TweetsMongoRepository {

    constructor() {
        this.db = null;
    }

    connect(callback) {

        const url = "mongodb://twitter_app:twitter_app@localhost:27017";

        MongoClient.connect(url, (err, client) => {
            if (err) {
                return callback(err);
            } else {
                this.db = client.db("twitterdb");
                return callback();
            }
        });
    }

    saveTweet(tweet, handler) {
        this.db.collection('tweets').save(tweet, (err, result) => {
            if (err) {
                console.log(err);
                handler.onError();
            } else {
                handler.onSuccess();
            }
        });
    }

    getAllTweets(handler) {
        // if (err) {
        //     handler.onError(err);
        // } else {
        //     let tweets = _parse(data);
        //     handler.onSuccess(tweets);
        // }
    }
}

module.exports = TweetsMongoRepository;
