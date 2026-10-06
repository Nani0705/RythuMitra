/**
 * 🌾 RythuMitra — Lightweight Zero-Dependency Local Dev Server
 * Automatically serves all assets and opens http://localhost:3000
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS & caching headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');

  // Parse requested URL path
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT, reqPath);

  // Security check to prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing if requested file doesn't exist
      const indexPath = path.join(ROOT, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

function listenOnPort(port) {
  server.listen(port, () => {
    console.log('\n======================================================');
    console.log(`🌾 RythuMitra Local Dev Server is Running!`);
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(`🔐 Role Login: http://localhost:${port}/#login`);
    console.log(`📂 Project Root: ${ROOT}`);
    console.log('======================================================\n');

    // Open default browser on Windows
    const startCmd = process.platform === 'win32' ? `start http://localhost:${port}` : `xdg-open http://localhost:${port}`;
    exec(startCmd, () => {});
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} in use, trying port ${PORT + 1}...`);
    PORT += 1;
    listenOnPort(PORT);
  } else {
    console.error('Server error:', err);
  }
});

listenOnPort(PORT);
