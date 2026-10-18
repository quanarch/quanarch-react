/**
 * A minimal router: each route is { method, path, handler }. Paths match
 * exactly; the query string is ignored.
 */
export function createRouter(routes) {
  return {
    async handle(req, res) {
      const url = new URL(req.url, 'http://localhost');
      const route = routes.find((r) => r.method === req.method && r.path === url.pathname);
      if (!route) return false;
      await route.handler(req, res, url);
      return true;
    },
  };
}
