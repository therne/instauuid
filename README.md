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

instauuid(); // Default: Base64 - ex) "paZhL98FBXs"
instauuid('hex'); // Hex String - ex) "a5afe16d768b4cdf"
instauuid('decimal'); // Decimal String - ex) "11939009410687035132"

// Using InstaUUID with MySQL
// See "Integrating with your database" Section.
var sql = 'INSERT INTO users (id, name) VALUES (??, ??)';
sql = mysql.format(instauuid('decimal'), 'John Doe');

// You can add some information to prevent hash conflicts. (recommended for big systems)
instauuid({ type: 'hex', additional: shardId, countNumber: 1022 });
```

## Integrating with your database

### MySQL

First, You need to set your primary key datatype to UNSIGNED BIGINT.
```sql
CREATE TABLE foo (
   id   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
   ....
);
```

#####[node-mysql](https://github.com/felixge/node-mysql/) Driver
- Set 'supportBigNumbers', 'bigNumberStrings' options to true when connecting. 
 - *This option makes you to read BIGINT as String, because UUID is too big that<br>JavaScript Number type cannot support. Number can handle up to 2^53 but we're using 2^64 range (Unsigned Int64)*
- I recommend to use [Long](https://github.com/dcodeIO/Long.js) or [bignumber.js](https://github.com/MikeMcl/bignumber.js/) Library when handling BIGINT data.
- Use 'decimal' type when generating UUID. (See above example)

### Redis
Redis stores Integer as String, so you don't need to worry about anything.

### MongoDB
Just use MongoDB ObjectId.


## Documentation
### instauuid(options)
Generates and returns UUID.

* `options` (object || string): Generating options. (or return type)

Option      | Description                                                  | Range | Default
-------     | ------------------------------------------------------------ | ---- | ------
type        | Return type of generated ID. See below for more details. | - | 'base64'
additional  | Additional Unique Information (ex: Logical Shard ID) | 0 ~ 8191 | *(current time as μs)*
countNumber | Auto-incrementing sequence - to prevent conflicting  | 0 ~ 1023 | *(Random)*

##### Return types
Name     | Description            | Type     |
---------| ---                    | ---      |
base64   | Base64 Hash (Note that this is not pure Base64. *We uses URL-Safe Base64URL*) | *String* |
decimal  | Decimal **String**     | *String* |
number   | *(Same as above)*        | -        |
hex      | Hex String             | *String* |
hash     | *(Same as above)*        | -        |
long     | [Long](https://github.com/dcodeIO/Long.js) object | *Long* |
buffer   | [Buffer](http://nodejs.org/api/buffer.html) object | *Buffer*|
buffer_be| Big-Endian encoded buffer | *Buffer* |
raw      | Raw ASCII Bytes - Don't recommend. | *String* |

#### License: MIT
#### Author: [Hyojun Kim](http://github.com/retail3210)

[npm-image]: https://img.shields.io/npm/v/instauuid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/instauuid
[node-version-image]: https://img.shields.io/badge/node.js-%3E%3D_0.6-brightgreen.svg?style=flat-square
[node-version-url]: http://nodejs.org/download/
[downloads-image]: http://img.shields.io/npm/dm/instauuid.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/instauuid

