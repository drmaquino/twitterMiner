// external dependencies
const fs = require('fs');

// constants
const DB_PATH = './db/test-db.txt';
const ENCODING = 'utf-8';

class TweetsRepository {

    saveTweet(tweet, handler) {
        let tweetAsString = `${tweet.field},${tweet.body}\n`;

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
    let tweets = [];
    let lines = data.split('\n');
    for (let line of lines) {
        let fields = line.split(',');
        if (fields.length == 2){
            let tweet = {
                field : fields[0],
                body : fields[1]
            };
            tweets.push(tweet);
        }
    }
    return tweets;
}

module.exports = TweetsRepository;
