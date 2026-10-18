import crypto from 'node:crypto';

export function hashPassword(salt, password) {
  return crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

export function newToken() {
  return crypto.randomBytes(24).toString('hex');
}
