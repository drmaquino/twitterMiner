// external dependencies
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;

// constants
const URL = "mongodb://twitter_app:twitter_app@localhost:27017";

class TweetsMongoRepository {

    constructor() {
        this.db = null;
    }

    connect(callback) {
        MongoClient.connect(URL, (err, client) => {
            if (err) {
                return callback(err);
            } else {
                this.db = client.db("twitterdb");
                return callback();
            }
        });
    }

    saveTweet(tweet, handler) {
        if (this.db) {
            console.log(tweet);
            this.db.collection('tweets').save(tweet, (err, result) => {
                if (err) {
                    console.log(err);
                    handler.onError();
                } else {
                    handler.onSuccess();
                }
            });
        } else {
            console.log("no cnx found");
            // this.connect((err) => {
            //     if (err) {
            //         throw err;
            //     } else {
            //         this.db.collection('tweets').save(tweet, (err, result) => {
            //             if (err) {
            //                 console.log(err);
            //                 handler.onError();
            //             } else {
            //                 handler.onSuccess();
            //             }
            //         });
            //     }
            // })
        }
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
