// external dependencies
const fs = require('fs');

// constants
const DB_PATH = './db/test-db.txt';
const ENCODING = 'utf-8';

class TweetsRepository {

    // saveTweet(tweet, onError, onSuccess) {
    //     fs.appendFile(DB_PATH, 'text, this is the body of the tweet\n', (err) => {
    //         if (err) throw err;
    //     });
    // }

    getAllTweets(onError, onSuccess) {
        fs.readFile(DB_PATH, ENCODING, (err, data) => {
            if (err) {
                onError(err);
            } else {
                let tweets = _parse(data);
                onSuccess(tweets);
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
