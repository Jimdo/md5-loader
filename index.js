/*
    MIT License http://www.opensource.org/licenses/mit-license.php
    Author Tim Sebastian @timse
*/
var loaderUtils = require("loader-utils");
var path = require('path');
var crypto = require('crypto');
var tar = require('tar');
var fstream = require('fstream');

module.exports = function(content) {
    var callback = this.async();

    var query = loaderUtils.parseQuery(this.query);
    if (!query.path) {
        callback(new Error('path parameter missing - please add something like md5?path=my-path to your loader'));
    }
    var hashTarget = path.join(process.cwd(), query.path);

    var md5sum = crypto.createHash('md5');

    var tarStream = fstream
        .Reader(hashTarget)
        .pipe(tar.Pack());

    tarStream.on('data', function(d) {
        md5sum.update(d);
    }).on('end', function() {
        var hashDigest = md5sum.digest('hex');
        console.log('%s - md5 loader calculated hash of %s', hashDigest, hashTarget);
        callback(null, 'module.exports = "' + hashDigest + '";');
    }).on('error', function(err) {
        console.warn('md5 loader failed on path %s', hashTarget);
        callback(err, '');
    });
}
