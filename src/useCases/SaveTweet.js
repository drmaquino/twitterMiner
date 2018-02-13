class SaveTweets {

    constructor(repo, handler) {
        this.repo = repo;
        this.handler = handler;
    }

    start(tweet) {
        this.repo.saveTweet(tweet, (error) => {
            if (error) {
                this.handler(error);
            } else {
                this.handler();
            }
        });
    }
}

module.exports = SaveTweets;
