export interface Proof {
  previousCommit: Uint8Array;
  artifacts: { publicKey: Uint8Array; nonce: Uint8Array }[];
  signature: Uint8Array;
}

export const crypto_auth_hmacsha512_BYTES = 64 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_auth_hmacsha512_KEYBYTES =
  32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_hash_sha512_BYTES = 64 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_sign_ed25519_BYTES = 64 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_sign_ed25519_SEEDBYTES = 32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_sign_ed25519_PUBLICKEYBYTES =
  32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_sign_ed25519_SECRETKEYBYTES =
  64 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_secretbox_KEYBYTES = 32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_secretbox_NONCEBYTES = 24 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_box_poly1305_AUTHTAGBYTES =
  16 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_box_x25519_PUBLICKEYBYTES =
  32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_box_x25519_SECRETKEYBYTES =
  32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_box_x25519_NONCEBYTES = 12 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_kx_SESSIONKEYBYTES = 32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_aead_chacha20poly1305_ietf_KEYBYTES =
  32 * Uint8Array.BYTES_PER_ELEMENT;
export const crypto_pwhash_argon2id_SALTBYTES =
  16 * Uint8Array.BYTES_PER_ELEMENT;

// Commit specific
export const commitLen = crypto_hash_sha512_BYTES;
export const commitDetailsLen = crypto_auth_hmacsha512_BYTES;
export const nonceLen = crypto_auth_hmacsha512_KEYBYTES;

export interface SignKeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export const getEncryptedLen = (dataLen: number) => {
  return (
    crypto_box_x25519_NONCEBYTES + // xchacha uses 24 byte nonce while ietf 12
    dataLen +
    crypto_box_poly1305_AUTHTAGBYTES // 16 bytes poly1305 auth tag
  );
};

export const getDecryptedLen = (encryptedLen: number) => {
  return (
    encryptedLen -
    crypto_box_x25519_NONCEBYTES - // nonce
    crypto_box_poly1305_AUTHTAGBYTES // authTag
  );
};

export const getProofLen = (
  identitiesLen: number,
  identityChosenIndex: number,
) => {
  return (
    crypto_hash_sha512_BYTES +
    (identitiesLen - identityChosenIndex) *
      (crypto_sign_ed25519_PUBLICKEYBYTES + crypto_auth_hmacsha512_KEYBYTES) +
    crypto_sign_ed25519_BYTES
  );
};

export default {
  crypto_hash_sha512_BYTES,
  crypto_sign_ed25519_BYTES,
  crypto_sign_ed25519_SEEDBYTES,
  crypto_sign_ed25519_PUBLICKEYBYTES,
  crypto_sign_ed25519_SECRETKEYBYTES,
  crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES,
  crypto_box_poly1305_AUTHTAGBYTES,
  crypto_box_x25519_PUBLICKEYBYTES,
  crypto_box_x25519_SECRETKEYBYTES,
  crypto_box_x25519_NONCEBYTES,
  crypto_kx_SESSIONKEYBYTES,
  crypto_aead_chacha20poly1305_ietf_KEYBYTES,
  crypto_pwhash_argon2id_SALTBYTES,
  commitLen,
  commitDetailsLen,
  nonceLen,
  getEncryptedLen,
  getDecryptedLen,
  getProofLen,
};
