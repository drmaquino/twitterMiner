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

    createTweetsRepository () {
        const repo = {};
        repo.getAllTweets = (onError, onSuccess) => {
            onSuccess(sampleTweets);
        };
        return repo;
    }

    createGetAllTweetsController () {
        const controller = {};
        controller.onGetAllTweets = (req, res) => {
            res.send(sampleTweets);
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
