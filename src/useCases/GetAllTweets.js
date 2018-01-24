class GetAllTweets {

    constructor(repo, handler){
        this.repo = repo;
        this.handler = handler;
    }

    start() {
        let onError = () => {
            this.handler.tweetsRetrievalFailed();
        };

        let onSuccess = (tweets) => {
            this.handler.tweetsRetrieved(tweets);
        };
        this.repo.getAllTweets(onError, onSuccess);
    }
}

module.exports = GetAllTweets;
