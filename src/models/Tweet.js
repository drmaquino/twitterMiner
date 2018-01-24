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
    isValid = isValid && tweet.hasOwnProperty('field');
    isValid = isValid && tweet.hasOwnProperty('body');
    return isValid;
}

module.exports = {
    isValid : validateTweetsFormat,
    areValid : validateTweetsFormat
};
