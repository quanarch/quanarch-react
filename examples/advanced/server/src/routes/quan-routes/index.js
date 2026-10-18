import { config } from '../../config/index.js';
import { db } from '../../db/index.js';
import { authService } from '../../services/auth-service/index.js';
import { quanService } from '../../services/quan-service/index.js';
import { bearerToken, sendJson } from '../../utils/http-util/index.js';

export const quanRoutes = [
  {
    // The quans delivered over the API: asked for once, after sign-in.
    method: 'GET',
    path: '/api/quans',
    handler(req, res) {
      const user = authService.userFor(bearerToken(req));
      if (!user) return sendJson(res, 401, { error: 'Not signed in' });
      sendJson(res, 200, quanService.listFor(user, 'api'));
    },
  },
  {
    // The quans delivered over Server-Sent Events: sent on connect and again
    // whenever the quans table changes. EventSource cannot set headers, so the
    // token comes in the query string.
    method: 'GET',
    path: '/api/quans/stream',
    handler(req, res, url) {
      const user = authService.userFor(url.searchParams.get('token'));
      if (!user) return sendJson(res, 401, { error: 'Not signed in' });

      res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      const push = () => res.write(`event: quans\ndata: ${JSON.stringify(quanService.listFor(user, 'sse'))}\n\n`);
      push();
      const stopWatching = db.onChange(push);
      const heartbeat = setInterval(() => res.write(': heartbeat\n\n'), config.sseHeartbeatMs);
      req.on('close', () => {
        stopWatching();
        clearInterval(heartbeat);
      });
    },
  },
];
