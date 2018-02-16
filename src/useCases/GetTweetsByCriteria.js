class GetTweetsByCriteria {

    constructor(repo, handler) {
        this.repo = repo;
        this.handler = handler;
    }

    start(criteria) {
        this.repo.getTweetsByCriteria(criteria, (error, tweets) => {
            if (error) {
                this.handler(error);
            } else {
                this.handler(null, tweets);
            }
        });
    }
}

module.exports = GetTweetsByCriteria;
