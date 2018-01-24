TweetsRepository = require('../repositories/TweetsRepository');

class Factory {

    constructor () {
        this.repository = null;
    }

    createTweetsRepository () {
        if (this.repository == null){
            this.repository = new TweetsRepository();
        }
        return this.repository;
    }
}

module.exports = Factory;
