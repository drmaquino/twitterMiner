const sampleTweet = {
    "created_at": "Wed Jan 24 20:40:22 +0000 2018",
    "id": 956265440921124900,
    "id_str": "956265440921124865",
    "text": "RT @FrontendDaily: Should You Use CSS or JavaScript for Web Animations? https://t.co/pPUN9JOqfE (Is one better than the other? Zell Liew sh…",
    "user": {
        "id": 49801336,
        "id_str": "49801336",
        "name": "Nathan Smith",
        "screen_name": "nathantweet"
    },
    "entities": {
        "hashtags": [],
        "urls": [{
            "url": "https://t.co/pPUN9JOqfE",
            "expanded_url": "https://www.heartinternet.uk/blog/should-you-use-css-or-javascript-for-web-animations/",
            "display_url": "heartinternet.uk/blog/should-yo…",
            "indices": [72, 95]
        }],
        "user_mentions": [{
            "screen_name": "FrontendDaily",
            "name": "Frontend Daily",
            "id": 359047792,
            "id_str": "359047792",
            "indices": [3, 17]
        }],
        "symbols": []
    }
};

const sampleTweet2 = {
    "created_at": "Wed Jan 24 20:40:22 +0000 2018",
    "id": 956265440921124900,
    "id_str": "956265440921124865",
    "text": "RT @FrontendDaily: Should You Use CSS or JavaScript for Web Animations? https://t.co/pPUN9JOqfE (Is one better than the other? Zell Liew sh…",
    "user": {
        "id": 49801336,
        "id_str": "49801336",
        "name": "John Doe",
        "screen_name": "nathantweet"
    },
    "entities": {
        "hashtags": [],
        "urls": [{
            "url": "https://t.co/pPUN9JOqfE",
            "expanded_url": "https://www.heartinternet.uk/blog/should-you-use-css-or-javascript-for-web-animations/",
            "display_url": "heartinternet.uk/blog/should-yo…",
            "indices": [72, 95]
        }],
        "user_mentions": [{
            "screen_name": "FrontendDaily",
            "name": "Frontend Daily",
            "id": 359047792,
            "id_str": "359047792",
            "indices": [3, 17]
        }],
        "symbols": []
    }
};

const sampleTweets = [ sampleTweet, sampleTweet2 ];

class MockFactory {

    getSampleTweets () {
        return sampleTweets;
    }

    getSampleTweet () {
        return sampleTweet;
    }

    createTweetsRepository () {
        const repo = {
            connect: (callback) => {
                callback();
            },
            getAllTweets: (callback) => {
                callback(null, sampleTweets);
            },
            saveTweet: (tweet, callback) => {
                callback();
            },
            getTweetsByCriteria: (criteria, callback) => {
                callback(null, sampleTweets);
            }
        };
        return repo;
    }

    createGetAllTweetsController () {
        const controller = {
            onGetAllTweets: (req, res) => {
                res.send(sampleTweets);
            }
        };
        return controller;
    }

    createGetTweetsByCriteriaController () {
        const controller = {
            onGetTweetsByCriteria: (req, res) => {
                res.send(sampleTweets);
            }
        };
        return controller;
    }

    createTwitterHelperForUsers () {
        const helper = {
            startStream: (filter, callback) => {
                let callCount = 0;
                const repeater = setInterval(() => {
                    if (callCount < 3) {
                        callback(null, sampleTweet);
                        callCount += 1;
                    } else {
                        clearInterval(repeater);
                    }
                }, 1000);
            }
        };
        return helper;
    }

    createTwitterHelperForApps () {
        throw "not yet implemented"
    }
}

module.exports = MockFactory;
