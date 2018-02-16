class TweetsVolatileRepository {

    constructor () {
        this.tweets = [];
        console.log(">> using in memory repository");
    }

    connect(callback) {
        return callback()
    }

    saveTweet(tweet, handler) {
        this.tweets.push(tweet);
        // handler.onSuccess();
        handler();
    }

    getAllTweets(handler) {
        // handler.onSuccess(this.tweets);
        handler(null, this.tweets);
    }

}

module.exports = TweetsVolatileRepository;
