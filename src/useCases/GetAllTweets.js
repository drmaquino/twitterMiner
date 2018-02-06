class GetAllTweets {

    constructor(repo, presenter) {
        this.repo = repo;
        this.presenter = presenter;
    }

    start() {
        const queryHandler = {
            onError: () => {
                this.presenter.tweetsRetrievalFailed();
            },
            onSuccess: (tweets) => {
                this.presenter.tweetsRetrieved(tweets);
            }
        };
        this.repo.getAllTweets(queryHandler);
    }
}

module.exports = GetAllTweets;
