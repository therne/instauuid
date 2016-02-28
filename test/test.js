'use strict';

var instauuid = require('../');
var should = require('should');
var Long = require('long');

describe('instauuid()', function() {
    it('should not return null', function() {
        should.exist(instauuid());
    });

    it('should not return the same UUID when it called multiple times', function() {
        var uuid1 = instauuid();
        var uuid2 = instauuid();
        uuid1.should.not.be.equal(uuid2);
    });

    it('should return string by default', function() {
        instauuid().should.be.String();
    });

    it('should return buffer when buffer type is given', function() {
        var uuid = instauuid('buffer');
        uuid.should.be.instanceOf(Buffer);
    });

    it('should return long when long type is given', function() {
        instauuid('long').should.be.instanceOf(Long);
    });
});
