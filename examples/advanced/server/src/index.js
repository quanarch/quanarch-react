import http from 'node:http';
import { config } from './config/index.js';
import { createRouter } from './router/index.js';
import { authRoutes } from './routes/auth-routes/index.js';
import { dataRoutes } from './routes/data-routes/index.js';
import { quanRoutes } from './routes/quan-routes/index.js';
import { sendJson } from './utils/http-util/index.js';

const router = createRouter([...authRoutes, ...quanRoutes, ...dataRoutes]);

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();

  try {
    const handled = await router.handle(req, res);
    if (!handled) sendJson(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Internal error' });
  }
});

server.listen(config.port, () => console.log(`listening on http://localhost:${config.port}`));
