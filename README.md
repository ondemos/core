# @ondemos/core-js

[![codecov][codecov-image]][codecov-url]
[![Known Vulnerabilities](https://snyk.io/test/github/ondemos/core-js/badge.svg?targetFile=package.json)](https://snyk.io/test/github/ondemos/core-js?targetFile=package.json)
<br>
![NPM Version](https://img.shields.io/npm/v/@ondemos/core)
![NPM License](https://img.shields.io/npm/l/@ondemos/core)
[![code-style-prettier][code-style-prettier-image]][code-style-prettier-url]
<br>
![NPM Downloads](https://img.shields.io/npm/dw/@ondemos/core)
[![](https://data.jsdelivr.com/v1/package/npm/@ondemos/core/badge)](https://www.jsdelivr.com/package/npm/@ondemos/core)

[codecov-image]: https://codecov.io/gh/ondemos/core-js/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ondemos/core-js
[code-style-prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[code-style-prettier-url]: https://github.com/prettier/prettier

This repository contains cryptographic functions that may be useful for digital democracy. 

It does not have any native dependencies and can be used in both Nodejs and the browser.

The API is not completely stable and the code has not undergone external security audits. Use at your own risk.

## Introduction

This library uses the WASM output from the [core C library](https://github.com/ondemos/core) and wraps it in Typescript.

## Files

The [commitment](src/commitment) directory contains the utility functions for private liquid votes.

The [utils](src/utils) directory contains sha512 and argon2 hashing, mnemonic generation and validation and symmetric and asymmetric cryptography operations with Ed25519 and ChaCha20Poly1305. 

The [merkle](src/merkle) directory contains a Merkle root getter function, a Merkle
proof artifacts getter, a root from proof getter and a proof verification function.

The [shamir](src/shamir) directory contains a WASM implementation of a cryptographic technique called [Shamir's secret
sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing), which allows one to split a secret into random shares that can only recreate it if a threshold of them is combined.
Under the hood it uses the libsodium randombytes js method to generate random coefficients for the polynomial.

## Getting Started

To get started you have to install the package with

```
npm install @ondemos/core
```

You can include as ES module

```typescript
import ondemos from "@ondemos/core";
```

as CommonJS module

```javascript
const ondemos = require("@ondemos/core");
```

or as UMD in the browser with

```html
<script src="https://cdn.jsdelivr.net/npm/@ondemos/core@latest/lib/index.min.js"></script>
```

## Examples

You can visit the [__tests__](__tests__) folder to find usage examples.

For Curve25519 public key cryptography we have the following methods

```typescript
import ondemos from "@ondemos/core";

// Words from dictionary create random seed for Ed25519 private key.
// Default entropy is 128bits, which results in 12 words.
const mnemonic = await ondemos.generateMnemonic();
console.log(`Mnemonic with 128 bits of entropy => 12 words: ${mnemonic}`);
// Max entropy is 256bit, where generateMnemonic(256) results in 24 words.

// Keypair is an object representing an Ed25519 keypair with { publicKey: Uint8Array(32), secretKey: Uint8Array(64) }
const keypair = await ondemos.keyPairFromMnemonic(mnemonic);
console.log(
  `Keypair from mnemonic: {\n\
  secretKey: ${Buffer.from(keypair.secretKey).toString("hex")}\n\
  publicKey: ${Buffer.from(keypair.publicKey).toString("hex")}\n}\
`,
);

// Generates a Uint8Array(128) full of random bytes
const message = await ondemos.randomBytes(128);

// EdDSA
const signature = await ondemos.sign(message, keypair.secretKey);

const verify = await ondemos.verify(message, signature, keypair.publicKey);
console.log(verify); // true

const hash = await ondemos.sha512(message);

const keypair2 = await ondemos.keyPair();

// Forward secrecy box.
// Encryptor generates a random keypair. The public key is contained in the
// "encrypted" box and the secret key is used for the key exchange with
// "keypair2.publicKey" and then it is removed from memory.
const encrypted = await ondemos.encryptAsymmetric(
  message,
  keypair2.publicKey,
  keypair.secretKey,
  hash,
);

const decrypted = await ondemos.decryptAsymmetric(
  encrypted,
  keypair.publicKey,
  keypair2.secretKey,
  hash,
);

// To test equality for two Uint8Arrays in js you need to check if each of their elements are equal
// The === operator does not work
for (let i = 0; i < message.length; i++) {
  if (message[i] !== decrypted[i]) console.error("Arrays unequal");
}

const symmetricKey = await ondemos.randomBytes(
  ondemos.interfaces.crypto_kx_SESSIONKEYBYTES,
);
const encrypted1 = await ondemos.encryptSymmetric(message, symmetricKey, hash);
const decrypted1 = await ondemos.decryptSymmetric(encrypted1, key, hash);
```

For Shamir secret sharing you can test the following

```typescript
import ondemos from "@ondemos/core";

const keypair = await ondemos.keyPair();

// 100 splitted shares, you need 60 to recreate keypair.secretKey
// Note that you can have max 255 shares and threshold <= shares
const shares = await ondemos.splitSecret(keypair.secretKey, 100, 60);

// Should be equal to keypair.secretKey
const sk1 = await ondemos.restoreSecret(shares);

console.log("sk1 and kaypair.secretKey are equal");

// Remove 40 shares to see if it will still work
const lessShares = shares.slice(0, shares.length - 40);

// Should be equal to sk1 and keypair.secretKey
const sk2 = await ondemos.restoreSecret(lessShares);

console.log("sk2 and kaypair.secretKey are equal");

const evenLessShares = lessShares.slice(0, lessShares.length - 1);

// Should not be equal to sk1 and sk2.
const sk3 = await ondemos.restoreSecret(evenLessShares);

console.log("sk3 and kaypair.secretKey are NOT equal");
```

In order to find the Merkle root, proof and to verify the proof you can do the following:

```typescript
import ondemos from "@ondemos/core";

const randomArrays: Uint8Array[] = [];
for (let i = 0; i < 50; i++) {
  randomArrays.push(await ondemos.randomBytes(32));
}

// ondemos.constants.crypto_hash_sha512_BYTES
// Function also accepts any type of data but it then requires a serializer function.
const randomArraysMerkleRoot = await ondemos.getMerkleRoot(randomArrays);

// Multiple of ondemos.constants.crypto_hash_sha512_BYTES
const randomArrayMerkleProof = await ondemos.getMerkleProof(
  randomArrays,
  randomArrays[43],
);

const elementHash = await ondemos.sha512(randomArrays[43]);

const verify = await ondemos.verifyMerkleProof(
  elementHash,
  randomArraysMerkleRoot,
  randomArrayMerkleProof,
);

console.log(verify); // should be true
```

For more examples you can see the [tests](__tests__) directory.

## Development

If you want to bundle the library yourselves, you need to have [Emscripten](https://github.com/emscripten-core/emscripten)
installed on your machine in order to compile the C code into WebAssembly.
We have the `-s SINGLE_FILE=1` option for the `emcc` compiler, which converts the `wasm` file to a `base64` string
that will be compiled by the glue js code into a WebAssembly module. This was done for the purpose of interoperability
and modularity.

Once you have all the dependencies installed, you can clone the core library, compile it, copy the wasm output and build:

```
git clone https://github.com/ondemos/core
cd core
git submodule update --init --recursive
git clone https://github.com/emscripten-core/emsdk
cd emsdk
./emsdk install latest
./emsdk activate latest
cd ..
source ./build.sh
cd ..
git clone https://github.com/ondemos/core-js
cd core-js
npm i 
npm run copy:wasm
npm run build
```

and [Rollup](https://github.com/rollup/rollup) will generate the UMD, ESM and CJS bundles.

## Releases

Releases are available on [Github](https://github.com/ondemos/core-js/releases)
and [npmjs.com](https://www.npmjs.com/package/@ondemos/core-js)

## License

The source code is licensed under the terms of the Affero General Public License version 3.0 (see [LICENSE](LICENSE)).

## Copyright

Copyright (C) 2024 Deliberative Technologies P.C.
