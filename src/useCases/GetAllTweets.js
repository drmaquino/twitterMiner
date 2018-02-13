class GetAllTweets {

    constructor(repo, handler) {
        this.repo = repo;
        this.handler = handler;
    }

    start() {
        this.repo.getAllTweets((error, tweets) => {
            if (error) {
                this.handler(error);
            } else {
                this.handler(null, tweets);
            }
        });
    }
}

module.exports = GetAllTweets;
