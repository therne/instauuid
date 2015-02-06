'use strict';

// native generator
var generator = require('./build/Release/generator');

//  long support (64-bit number)
var Long = require('long');

function paramDefault(param, defaultValue) {
    return param == undefined ? defaultValue : param;
}

function unLittleEndian(buf) {
    for (var i=0;i<4;i++) {
        buf[i] ^= buf[7-i];
        buf[7-i] ^= buf[i];
        buf[i] ^= buf[7-i];
    }
    return buf;
}

function toLong(buf) {
    return new Long(buf.readInt32LE(0), buf.readInt32LE(4), true);
}

/**
 * Generate Insta-UUID.
 */
function generate(options) {
    options        = options || {};
    if (typeof options === 'string') options = { type: options };

    var type       = paramDefault(options.type, 'base64');
    var additional = paramDefault(options.additional, 0);
    var count      = paramDefault(options.countNumber, parseInt(Math.random() * 10000 % 1024));

    var rawBuffer = generator.generate(count, additional);

    if (type === 'base64') {
        // NOTE: this is URL-safe Base64Url format. not pure base64.
        // + since UUID is fixed 64bit we don't have to worry about padding(=)
        return unLittleEndian(rawBuffer) 
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');

    } else if (type === 'hash' || type == 'hex') {
        return unLittleEndian(rawBuffer).toString('hex');

    } else if (type === 'decimal' || type == 'number') {
        return toLong(rawBuffer).toString();

    } else if (type === 'long') {
        return toLong(rawBuffer);

    } else if (type == 'buffer') {
        return rawBuffer;

    } else if (type == 'buffer_be') {
        // to big endian
        return unLittleEndian(rawBuffer);

    } else if (type == 'raw') {
        // OMG, R u serious?
        return rawBuffer.toString();

    } else throw new TypeError("Unknown encoding: " + type);
}

module.exports = generate;
