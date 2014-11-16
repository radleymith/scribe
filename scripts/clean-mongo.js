'use strict';

// Clean out yo mongo dawg.

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/scribe');

var db = mongoose.connection;

console.log('Cleanin out yo mongo instance dawg...');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    require('../models/lecture').collection.remove(function(err) {
        function stoneColdSays (whatHeSays, kill) {
            return function () {
                console.log(whatHeSays);
                if (kill) process.exit();
            };
        }

        setTimeout(stoneColdSays('ONE BEER...', false), 1000);
        setTimeout(stoneColdSays('TWO BEERS...', false), 2000);
        setTimeout(stoneColdSays('THREE BEERS...', false), 3000);
        setTimeout(stoneColdSays('A SHOT OF WHISKEY...', false), 4000);
        setTimeout(stoneColdSays('A MARGARITA...', false), 5000);
        setTimeout(stoneColdSays('AND A BLOODY MARRY.', true), 6000);
    });
});
