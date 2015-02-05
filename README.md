# InstaUUID

Instagram-Style Compact UUID generator for Node.js.<br>
See [Instagram Engineering Blog - Sharding IDs at Instagram](http://instagram-engineering.tumblr.com/post/10853187575/sharding-ids-at-instagram)

Generates 8-byte UUID that consists of:
- 41 bits for time in milliseconds (we can use it until 2084/09/06 lunch time comes)
- 13 bits for additional information - Instagram used it to store the logical shard ID
- 10 bits that represent an auto-incrementing sequence.
 - *Note that you need to implement your own counter per machine - In default, we fill<br>this space with random values.*

Benefits of this library:
- **Qualified** - Because this library implements Instagram UUID Spec. and instagram rocks.
- **Compact Size** - The raw hash is only 8bytes, and Base64 hash is only 11 bytes!
- **URL-Safe** - The default Base64 encoding does not contain URL-non-safe characters.

To Install:
```
npm install --save instauuid
```

Example usage:
```javascript
var instauuid = require('instauuid');

instauuid(); // Default: Base64 - ex) pa1GN0wCWAA
instauuid('hash'); // Hex Hash - ex) a5ad42699204a800
instauuid('raw'); // Raw 8-byte (64bit) Hash.

// Or you can add some information to prevent hash conflicts. (recommend for big systems)
instauuid({ type: 'raw', additional: shardId, counter: 1022 });
```


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
