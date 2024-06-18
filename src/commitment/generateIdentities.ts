import demosMemory from "./memory";

import libdemos from "@libdemos";

import {
  crypto_sign_ed25519_PUBLICKEYBYTES,
  crypto_sign_ed25519_SECRETKEYBYTES,
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
const generateIdentities = async (
  identitiesLen = 1,
  module?: LibDemos,
): Promise<{
  nonces: Uint8Array[];
  publicKeys: Uint8Array[];
  secretKeys: Uint8Array[];
}> => {
  const wasmMemory =
    module?.wasmMemory ?? demosMemory.generateIdentitiesMemory(identitiesLen);
  const demosModule =
    module ??
    (await libdemos({
      wasmMemory,
    }));

  const noncesArrayLen =
    identitiesLen *
    crypto_auth_hmacsha512_KEYBYTES *
    Uint8Array.BYTES_PER_ELEMENT;
  const ptr1 = demosModule._malloc(noncesArrayLen);
  const noncesArray = new Uint8Array(wasmMemory.buffer, ptr1, noncesArrayLen);

  const ptr2 = demosModule._malloc(
    identitiesLen * crypto_sign_ed25519_PUBLICKEYBYTES,
  );
  const publicKeysArray = new Uint8Array(
    wasmMemory.buffer,
    ptr2,
    identitiesLen * crypto_sign_ed25519_PUBLICKEYBYTES,
  );

  const ptr3 = demosModule._malloc(
    identitiesLen * crypto_sign_ed25519_SECRETKEYBYTES,
  );
  const secretKeysArray = new Uint8Array(
    wasmMemory.buffer,
    ptr3,
    identitiesLen * crypto_sign_ed25519_SECRETKEYBYTES,
  );

  const result = demosModule._generate_identities(
    identitiesLen,
    noncesArray.byteOffset,
    publicKeysArray.byteOffset,
    secretKeysArray.byteOffset,
  );

  switch (result) {
    case 0: {
      const nonces: Uint8Array[] = [];
      const publicKeys: Uint8Array[] = [];
      const secretKeys: Uint8Array[] = [];

      for (let i = 0; i < identitiesLen; i++) {
        nonces.push(
          noncesArray.slice(
            i * crypto_auth_hmacsha512_KEYBYTES,
            (i + 1) * crypto_auth_hmacsha512_KEYBYTES,
          ),
        );

        publicKeys.push(
          publicKeysArray.slice(
            i * crypto_sign_ed25519_PUBLICKEYBYTES,
            (i + 1) * crypto_sign_ed25519_PUBLICKEYBYTES,
          ),
        );

        secretKeys.push(
          secretKeysArray.slice(
            i * crypto_sign_ed25519_SECRETKEYBYTES,
            (i + 1) * crypto_sign_ed25519_SECRETKEYBYTES,
          ),
        );
      }

      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      return {
        nonces,
        publicKeys,
        secretKeys,
      };
    }

    case -1: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error("Identities length should be at least 1.");
    }

    case -2: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error("Could not generate the first random nonce.");
    }

    case -3: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error("Could not generate the first ed25519 keypair.");
    }

    case -4: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error("Could not generate a random nonce after the first.");
    }

    case -5: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error(
        "Could not generate an ed25519 keypair after the first one.",
      );
    }

    default: {
      demosModule._free(ptr1);
      demosModule._free(ptr2);
      demosModule._free(ptr3);

      throw new Error("An unexpected error occured.");
    }
  }
};

export default generateIdentities;
