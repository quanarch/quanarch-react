import { authService } from '../../services/auth-service/index.js';
import { dataService } from '../../services/data-service/index.js';
import { bearerToken, sendJson } from '../../utils/http-util/index.js';

/** A route that answers only users holding permission. */
function guarded(method, path, permission, produce) {
  return {
    method,
    path,
    handler(req, res) {
      const user = authService.userFor(bearerToken(req));
      if (!user) return sendJson(res, 401, { error: 'Not signed in' });
      if (!user.permissions.includes(permission)) return sendJson(res, 403, { error: `Needs ${permission}` });
      sendJson(res, 200, produce());
    },
  };
}

/** The endpoints the quans call through the qua's http client. */
export const dataRoutes = [
  guarded('GET', '/api/billing/invoices', 'billing:read', dataService.invoices),
  guarded('POST', '/api/billing/invoices/export', 'billing:export', dataService.exportInvoices),
  guarded('GET', '/api/inventory/items', 'inventory:read', dataService.stockItems),
  guarded('POST', '/api/inventory/restock', 'inventory:write', dataService.restock),
  guarded('GET', '/api/reports', 'reports:read', dataService.reports),
  guarded('POST', '/api/reports/summary', 'reports:read', dataService.summarize),
  guarded('GET', '/api/analytics/metrics', 'analytics:read', dataService.metrics),
  guarded('POST', '/api/analytics/refresh', 'analytics:read', dataService.refreshMetrics),
];
