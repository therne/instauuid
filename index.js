'use strict';

// native generator
var generator = require('./build/Release/generator');

// int64 support (8-byte number)
var Int64 = require('node-int64');

/**
 * Generate Insta-UUID.
 */
function generate(options) {
    options        = options || {};
    if (typeof options === 'string') options = { type: options };
    var type       = options.type || 'base64';
    var additional = options.additional || 0;
    var count      = options.countNumber || parseInt(Math.random() * 10000 % 1024);

    var raw = generator.generate(count, additional);
    if (type === 'base64') {
        // NOTE: this is URL-safe Base64Url format. not pure base64.
        return new Int64(raw).toBuffer().toString('base64')
            .replace('+', '-')
            .replace('/', '_')
            .replace('=', ''); // since uuid is solid 64bit we don't have to worry about padding

    } else if (type === 'hash') {
        return new Int64(raw).toBuffer().toString('hex')
    }
    return raw;
}

module.exports = generate;
