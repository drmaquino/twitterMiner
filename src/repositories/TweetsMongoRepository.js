// external dependencies
const MongoClient = require("mongodb").MongoClient;
const Server = require("mongodb").Server;

// internal dependencies
const config = require("../../config");

class TweetsMongoRepository {

    constructor() {
        this.db = null;
    }

    connect(callback) {
        MongoClient.connect(config.db.localUri, (error, client) => {
            if (error) {
                callback(error);
            } else {
                this.db = client.db("twitterdb");
                callback();
            }
        });
    }

    saveTweet(tweet, callback) {
        if (this.db) {
            console.log(tweet);
            this.db.collection("tweets").save(tweet, (error, result) => {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    callback();
                }
            });
        } else {
            console.log("no cnx found");
        }
    }

    getAllTweets(callback) {
        console.log("TweetsMongoRepository#getAllTweets: not implemented yet");
    }
}

module.exports = TweetsMongoRepository;
