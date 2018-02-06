const sampleTweets = [
                        {
                            "field": "test field",
                            "body":"test body"
                        },
                        {
                            "field": "test field",
                            "body":"test body"
                        }
                    ];

class MockFactory {

    getSampleTweets () {
        return sampleTweets;
    }

    createTweetsRepository () {
        const repo = {
            getAllTweets: (handler) => {
                handler.onSuccess(sampleTweets);
            },
            saveTweets: (tweets, handler) => {
                handler.onSuccess();
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

    createTwitterHelperForUsers () {
        const helper = {};
        return helper;
    }

    createTwitterHelperForApps () {
        const helper = {};
        return helper;
    }
}

module.exports = MockFactory;
