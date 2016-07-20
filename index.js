/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tim Sebastian @timse
*/
var loaderUtils = require("loader-utils");
var path = require('path');
var hash = require('lucy-dirsum');

module.exports = function(content) {
    var callback = this.async();

    var query = loaderUtils.parseQuery(this.query);
    if (!query.path) {
        callback(new Error('path parameter missing - please add something like md5?path=my-path to your loader'));
    }
    var hashTarget = path.join(process.cwd(), query.path);

    hash(hashTarget, function (err, hashDigest){
        if (err) {
            console.warn('md5 loader failed on path %s', hashTarget);
            callback(err, '');
            return;
        }
        console.log('%s - md5 loader calculated hash of %s', hashDigest, hashTarget);
        callback(null, 'module.exports = "' + hashDigest + '";');
    });
}
