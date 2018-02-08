// external dependencies
const fs = require("fs");

// internal dependencies
const Tweet = require("../models/Tweet");

// constants
const DB_PATH = "./db/test-db.txt";
const ENCODING = "utf-8";
const LINE_SEPARATOR = "<NEWLINE>"

class TweetsFileRepository {

    connect(callback) {
        return callback();
    }

    saveTweet(tweet, handler) {
        let tweetAsString = Tweet.toString(tweet);
        tweetAsString += LINE_SEPARATOR;

        fs.appendFile(DB_PATH, tweetAsString, (err) => {
            if (err) {
                handler.onError();
            } else {
                handler.onSuccess();
            }
        });
    }

    getAllTweets(handler) {
        fs.readFile(DB_PATH, ENCODING, (err, data) => {
            if (err) {
                handler.onError(err);
            } else {
                let tweets = _parse(data);
                handler.onSuccess(tweets);
            }
        });
    }
}

function _parse(data) {
    const tweets = [];

    const lines = data.split(LINE_SEPARATOR);
    for (let line of lines) {
        if (line.trim.length > 0) {
            const tweet = Tweet.toJSON(line);
            tweets.push(tweet);
        }
    }
    return tweets;
}

module.exports = TweetsFileRepository;
