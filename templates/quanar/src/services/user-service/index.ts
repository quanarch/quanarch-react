/**
 * Where the quanar gets its user from. Replace with your authentication: a
 * session endpoint, an identity provider, a token.
 */
export const userService = {
  async getCurrentUser() {
    return { id: '1', name: 'Ada Lovelace' };
  },
};
