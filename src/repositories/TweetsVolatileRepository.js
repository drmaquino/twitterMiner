class TweetsVolatileRepository {

    constructor () {
        this.tweets = [];
    }

    connect(callback) {
        return callback()
    }

    saveTweet(tweet, handler) {
        this.tweets.push(tweet);
        handler.onSuccess();
    }

    getAllTweets(handler) {
        handler.onSuccess(this.tweets);
    }

}

module.exports = TweetsVolatileRepository;
