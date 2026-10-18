import { config } from '../../config/index.js';
import { db } from '../../db/index.js';
import { hashPassword, newToken } from '../../utils/crypto-util/index.js';

/** token → { userId, expiresAt }. Sessions live in memory: restarting the server signs everyone out. */
const sessions = new Map();

function toUser(row, data) {
  const permissions = data.permissions.filter((p) => p.user_id === row.id).map((p) => p.name);
  return { id: row.id, username: row.username, name: row.name, permissions };
}

export const authService = {
  login(username, password) {
    const data = db.read();
    const row = data.users.find((u) => u.username === username);
    if (!row || hashPassword(row.salt, String(password ?? '')) !== row.password_hash) return null;
    const token = newToken();
    sessions.set(token, { userId: row.id, expiresAt: Date.now() + config.sessionTtlMs });
    return { token, user: toUser(row, data) };
  },

  userFor(token) {
    const session = token && sessions.get(token);
    if (!session) return null;
    if (session.expiresAt < Date.now()) {
      sessions.delete(token);
      return null;
    }
    const data = db.read();
    const row = data.users.find((u) => u.id === session.userId);
    return row ? toUser(row, data) : null;
  },

  logout(token) {
    if (token) sessions.delete(token);
  },
};
