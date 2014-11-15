'use strict';

var multer = require('multer');

module.exports = function spec(app) {

    return {
        onconfig: function(config, next) {
            //config.get('view engines:js:renderer:arguments').push(app);
/*
            app.use(multer({
                dest: './temp/',
                onFileUploadComplete: function(file) {
                    console.log(file.fieldname + ' uploaded to  ' + file.path)
                },
                onParseEnd: function (req, next) {
                    console.log('finished parsing!');
                    next();
                }
            }));
*/
            next(null, config);
        }
    };
};
