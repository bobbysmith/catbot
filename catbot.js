var request = require('request');
var requestify = require('requestify');

module.exports = function (req, res, next) {

  var catUrl;

  requestify.get('http://random.cat/meow').then(function (response) {
    response.getBody();

    var resBody = JSON.parse(response.body);
    catUrl = resBody.file;
    console.log(catUrl);

    var username = req.body.user_name;
    var botPayload = { text: 'It\'s kitty time! @' + username + ' ' + catUrl};
    console.log(botPayload);

    if (username !== 'slackbot') {
      return res.status(200).json(botPayload);
    } else {
      return res.status(200).end();
    }
  });

}