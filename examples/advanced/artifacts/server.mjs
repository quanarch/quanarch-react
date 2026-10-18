// The artifact store: an S3 stand-in that serves the built quans in ./quans.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = Number(process.env.PORT ?? 4100);
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'quans');
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.map': 'application/json' };

http
  .createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = new URL(req.url, 'http://localhost');
    const file = path.normalize(path.join(ROOT, decodeURIComponent(url.pathname.replace(/^\/quans/, ''))));
    if (!url.pathname.startsWith('/quans/') || !file.startsWith(ROOT + path.sep)) {
      return res.writeHead(404).end();
    }
    fs.readFile(file, (error, content) => {
      if (error) return res.writeHead(404).end();
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(content);
    });
  })
  .listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}/quans/`));
