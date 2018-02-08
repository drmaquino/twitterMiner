class MineTweets {

    constructor(twitterHelper, repo) {
        this.twitterHelper = twitterHelper;
        this.repo = repo;
    }

    start(filter) {
        const repoHandler = {
            onSuccess: () => {
                console.log("tweet saved to repo");
            },
            onError: () => {
                console.log("tweet not saved to repo");
            }
        }

        const streamHandler = {
            onEvent: (tweet) => {
                console.log("esta entrando un tweet");
                this.repo.saveTweet(tweet, repoHandler);
            },
            onError: (error) => {
                console.log(error);
            }
        }
        this.twitterHelper.startStream(filter, streamHandler);
    }
}

module.exports = MineTweets;
