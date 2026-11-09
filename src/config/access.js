// Access configuration for password-gated sections.
// The password is stored ONLY as a SHA-256 hash — the plaintext never appears in
// the code, repo, or shipped bundle, so it can't be read from source.
// (A client-side gate still isn't strong security, but the password stays hidden.)
//
// To change the password, hash the new value and paste it below:
//   node -e "const {sha256}=require('./src/utils/sha256');console.log(sha256('NEW_PASSWORD'))"
export const CLIENTS_USERNAME = 'Admin';
export const CLIENTS_PASSWORD_SHA256 =
  '836c4dab339697d9ede71601979a16a92dcc30dba48a663c8c8d81c1ee90d225';
