class SaveTweets {

    constructor(repo, presenter) {
        this.repo = repo;
        this.presenter = presenter;
    }

    start(tweet) {
        const useCaseHandler = {
            onSuccess: () => {
                this.presenter.tweetsSaved();
            },
            onError: () => {
                this.presenter.tweetsSaveFailed();
            }
        };
        this.repo.saveTweet(tweet, useCaseHandler);
    }
}

module.exports = SaveTweets;
