function validateTweetsFormat(tweets) {
    isValid = true;
    for (let tweet of tweets) {
        isValid = isValid && validateTweetFormat(tweet);
        if (!isValid){
            break;
        }
    }
    return isValid;
}

function validateTweetFormat(tweet) {
    isValid = true;
    isValid = isValid && tweet.hasOwnProperty("text");
    isValid = isValid && tweet.hasOwnProperty("user");
    isValid = isValid && tweet.hasOwnProperty("entities");
    return isValid;
}

function toString(tweet) {
    reduced = {};
    reduced.user = {};
    reduced.user.name = tweet.user.name;
    reduced.text = tweet.text;
    reduced.entities = tweet.entities;
    asString = JSON.stringify(reduced);
    return asString;
}

function toJSON(line) {
    const asString = JSON.parse(line);
    return asString;
}

module.exports = {
    isValid : validateTweetsFormat,
    areValid : validateTweetsFormat,
    toString : toString,
    toJSON : toJSON
};
