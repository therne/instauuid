# InstaUUID

[![NPM Version][npm-image]][npm-url]
[![Node.js Version][node-version-image]][node-version-url]
[![NPM Downloads][downloads-image]][downloads-url]

See [Instagram Engineering Blog - Sharding IDs at Instagram](http://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram)

Instagram-Style Compact UUID generator for Node.js.

Generates 8-byte UUID that consists of:
- 41 bits for time in milliseconds (we can use it until 2084/09/06 lunch time comes)
- 13 bits for additional information - Instagram used it to store the logical shard ID
- 10 bits that represent an auto-incrementing sequence.
 - *Note that you need to implement your own counter per machine - In default, we fill<br>this space with random values.*

Benefits of this library:
- **Qualified** - Because this library implements Instagram UUID Spec. and instagram rocks.
- **Compact Size** - The raw hash is only 8bytes, and Base64 hash is only 11 bytes!
- **URL-Safe** - The default Base64 encoding does not contain URL-non-safe characters.

## Installation
```
$ npm install --save instauuid
```


## Examples

```js
var instauuid = require('instauuid');

instauuid(); // Default: Base64 - ex) pa1GN0wCWAA
instauuid('hash'); // Hex Hash - ex) a5ad42699204a800
instauuid('raw'); // Raw 8-byte (64bit) Hash.

// Or you can add some information to prevent hash conflicts. (recommend for big systems)
instauuid({ type: 'raw', additional: shardId, counter: 1022 });
```

## Documentation
### instauuid(options)
Generates and returns UUID.

* `options` (object || string): Generating options. (or return type)

Option      | Description                                                  | Range | Default
-------     | ------------------------------------------------------------ | ---- | ------
type        | Return type of generated UUID. ('base64', 'hash', 'raw') | - | 'base64'
additional  | Additional Unique Information (ex: Logical Shard ID) | 0 ~ 8191 | *(current time as μs)*
countNumber | Auto-incrementing sequence - to prevent conflicting  | 0 ~ 1023 | *(Random)*

#### License: MIT
#### Author: [Hyojun Kim](http://github.com/retail3210)

[npm-image]: https://img.shields.io/npm/v/instauuid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/instauuid
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.6-brightgreen.svg?style=flat-square
[node-version-url]: http://nodejs.org/download/
[downloads-image]: http://img.shields.io/npm/dm/instauuid.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/instauuid

