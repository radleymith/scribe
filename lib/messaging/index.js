var TWILIO_AUTH_TOKEN = '0efde1711d032ff90e899c0d4b5a5f79',
    TWILIO_ACCOUNT_SID = 'ACf2e76cb526b44be5b5e3c8e8f7fa9d02',
    TWILIO_NUMBER = +4432143387,
    twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN),
    Mailgun = require('mailgun').Mailgun,
    mg = new Mailgun('key-8982943de6b4984824ecd62132a9476f');

exports = module.exports = {

    /* sendText - Uses the twilio api to send a text to the user
     * @param {String} - to - a phone number to send a message to
     * @param {String} - url - the url where the users text can be found
     * @param {Function} - callback
     */
    sendText: function (to, url, callback) {
        twilio.sms.messages.create({
            to: to,
            from: TWILIO_NUMBER,
            body:'Hey! The text for your video has been posted at: ' + url + ' Enjoy!'
        }, callback)},

    /*
     * sendEmail - Uses the mailgun api to send an email to the user
     * @param {String} - to - an email to send a message to
     * @param {String} - url - the url where the users text can be found
     * @param {Function} - callback
     */
    sendEmail: function (to, url, callback) {
        mg.sendText('scribe@gmail.com',
            to,
            'Thank you for using Scribe',
            'Hey! The text for your video has been posted at: ' + url + ' Enjoy!',
            //'https://api.mailgun.net/v2/sandbox0467d407ca3541faa3d7db313e068bfe.mailgun.org/messages', //something like this will be needed eventually
            callback
        );
    }
};
