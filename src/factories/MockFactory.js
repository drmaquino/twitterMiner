class MockFactory {

    createTweetsRepository () {

        let tweets = [
            {
                field: "text",
                body: "text, this is the body of the tweet"
            },
            {
                field: "text",
                body: "text, this is the body of the tweet"
            }
        ]

        let repo = {};
        repo.getAllTweets = (onError, onSuccess) => {
            onSuccess(tweets);
        }

        return repo;
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
