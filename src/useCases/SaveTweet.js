class SaveTweets {

    constructor(repo, handler) {
        this.repo = repo;
        this.handler = handler;
    }

    start(tweet) {
        const useCaseHandler = {
            onSuccess: () => {
                this.handler.tweetsSaved();
            },
            onError: () => {
                this.handler.tweetsSaveFailed();
            }
        };
        this.repo.saveTweet(tweet, useCaseHandler);
    }
}

module.exports = SaveTweets;
