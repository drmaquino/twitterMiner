class MineTweets {

    constructor(twitterHelper, repo) {
        this.twitterHelper = twitterHelper;
        this.repo = repo;
    }

    start(filter) {
        this.twitterHelper.startStream(filter, (error, tweet) => {
            if (error) {
                console.log(error);
            } else {
                console.log("esta entrando un tweet");
                this.repo.saveTweet(tweet, (error) => {
                    if (error) {
                        console.log("tweet not saved to repo");
                    } else {
                        console.log("tweet saved to repo");
                    }
                });
            }
        });
    }
}

module.exports = MineTweets;
