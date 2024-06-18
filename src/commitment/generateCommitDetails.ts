import demosMemory from "./memory";

import libdemos from "@libdemos";

import {
  crypto_sign_ed25519_PUBLICKEYBYTES,
  crypto_auth_hmacsha512_BYTES,
  crypto_auth_hmacsha512_KEYBYTES,
} from "../utils/interfaces";

import type { LibDemos } from "@libdemos";

/**
 * Verifies that the hash was indeed included in the calculation of the Merkle root.
 * @param hash: The hash of the base element in question.
 * @param root: The Merkle root.
 * @param proof: The first element is the first leave that was added for the calculation etc. The last
 * byte is either 0 or 1, indicating whether it is to the left or to the right in the tree.
 */
const generateCommitDetails = async (
  nonces: Uint8Array[],
  publicKeys: Uint8Array[],
  module?: LibDemos,
): Promise<Uint8Array> => {
  const noncesLen = nonces.length;
  const wasmMemory =
    module?.wasmMemory ?? demosMemory.generateCommitDetailsMemory(noncesLen);
  const demosModule =
    module ??
    (await libdemos({
      wasmMemory,
    }));

  const noncesArrayLen =
    noncesLen * crypto_auth_hmacsha512_KEYBYTES * Uint8Array.BYTES_PER_ELEMENT;
  const ptr1 = demosModule._malloc(noncesArrayLen);
  const noncesArray = new Uint8Array(wasmMemory.buffer, ptr1, noncesArrayLen);
  for (let i = 0; i < noncesLen; i++) {
    noncesArray.set(nonces[i], i * crypto_auth_hmacsha512_KEYBYTES);
  }

  const publicKeysLen = publicKeys.length;
  const publicKeysArrayLen =
    publicKeysLen *
    crypto_sign_ed25519_PUBLICKEYBYTES *
    Uint8Array.BYTES_PER_ELEMENT;
  const ptr2 = demosModule._malloc(publicKeysArrayLen);
  const publicKeysArray = new Uint8Array(
    wasmMemory.buffer,
    ptr2,
    publicKeysArrayLen,
  );
  for (let i = 0; i < publicKeysLen; i++) {
    publicKeysArray.set(publicKeys[i], i * crypto_sign_ed25519_PUBLICKEYBYTES);
  }

  const ptr3 = demosModule._malloc(crypto_auth_hmacsha512_BYTES);
  const commitDetailsArray = new Uint8Array(
    wasmMemory.buffer,
    ptr3,
    crypto_auth_hmacsha512_BYTES,
  );

  const result = demosModule._generate_commit_details(
    noncesLen,
    noncesArray.byteOffset,
    publicKeysArray.byteOffset,
    commitDetailsArray.byteOffset,
  );

  demosModule._free(ptr1);
  demosModule._free(ptr2);

  switch (result) {
    case 0: {
      const commitDetails = Uint8Array.from([...commitDetailsArray]);

      demosModule._free(ptr3);

      return commitDetails;
    }

    case -1: {
      demosModule._free(ptr3);

      throw new Error("Identities length should be at least 1.");
    }

    case -2: {
      demosModule._free(ptr3);

      throw new Error("Could not hmac of first public key with first nonce.");
    }

    case -3: {
      demosModule._free(ptr3);

      throw new Error("Could not allocate hash memory.");
    }

    case -4: {
      demosModule._free(ptr3);

      throw new Error(
        "Could not calculate hmac hash of previous external commit detail with current nonce.",
      );
    }

    case -5: {
      demosModule._free(ptr3);

      throw new Error(
        "Could not calculate hmac hash of public key with derived nonce.",
      );
    }

    default: {
      demosModule._free(ptr3);

      throw new Error("An unexpected error occured.");
    }
  }
};

export default generateCommitDetails;
