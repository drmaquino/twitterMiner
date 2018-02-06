class SaveTweets {

    constructor(repo, presenter) {
        this.repo = repo;
        this.presenter = presenter;
    }

    start(tweets) {
        const useCaseHandler = {
            onSuccess: () => {
                this.presenter.tweetsSaved();
            },
            onError: () => {
                this.presenter.tweetsSaveFailed();
            }
        };
        this.repo.saveTweets(tweets, useCaseHandler);
    }
}

module.exports = SaveTweets;
