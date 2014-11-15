'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/spec')(app),
    mongoose = require('mongoose'),
    port = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/scribe');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  app.use(kraken(options));
  app.listen(port, function (err) {
      console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
  });
});
