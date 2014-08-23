//includes
var util = require('util'),
    twitter = require('twitter'),
    sentimentAnalysis = require('./sentimentAnalysis'),
    db = require('diskdb');

db = db.connect('db', ['sentiments']);
//config
var config = {
    consumer_key: 'sCI98MykpHOHhi21Awrlo6Ldr',
    consumer_secret: 'KyOtHTceq3Ihv0uoUiEejIgXIvGtjyPmjo9iZIBCrViONeWJ3G',
    access_token_key: '159200591-QQHjBlpX7ZrgSxdlGVSCc6g67ruH1bc4mk6bEvEr',
    access_token_secret: 'DhSYW7aN2LoIyOwZY0kg3eIgC8U5a83tQwDpqTqRZnQ11'
};

module.exports = function(text, callback) {
    var twitterClient = new twitter(config);
    var response = [], dbData = []; // to store the tweets and sentiment

    twitterClient.search(text, function(data) {
        debugger;
        console.log(data);
        for (var i = 0; i < data.statuses.length; i++) {
            var resp = {};

            resp.tweet = data.statuses[i];
            resp.sentiment = sentimentAnalysis(data.statuses[i].text);
            dbData.push({
                tweet: resp.tweet.text,
                score: resp.sentiment.score
            });
            response.push(resp);
        };
        db.sentiments.save(dbData);
        callback(response);
    });
}
