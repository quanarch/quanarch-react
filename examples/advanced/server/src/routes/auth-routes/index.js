import { authService } from '../../services/auth-service/index.js';
import { bearerToken, readJson, sendJson } from '../../utils/http-util/index.js';

export const authRoutes = [
  {
    method: 'POST',
    path: '/api/auth/login',
    async handler(req, res) {
      const { username, password } = await readJson(req);
      const session = authService.login(username, password);
      if (!session) return sendJson(res, 401, { error: 'Wrong username or password' });
      sendJson(res, 200, session);
    },
  },
  {
    method: 'GET',
    path: '/api/auth/me',
    handler(req, res) {
      const user = authService.userFor(bearerToken(req));
      if (!user) return sendJson(res, 401, { error: 'Not signed in' });
      sendJson(res, 200, user);
    },
  },
  {
    method: 'POST',
    path: '/api/auth/logout',
    handler(req, res) {
      authService.logout(bearerToken(req));
      sendJson(res, 200, { ok: true });
    },
  },
];
