#!/usr/bin/env node
// Simple mock API server for development (no dependencies)
// Usage: node scripts/mock-api.mjs

import http from "http";
import { parse } from "url";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

let products = [
  { id: "1", name: "Sample Product A" },
  { id: "2", name: "Sample Product B" },
];

function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString();
        if (!raw) return resolve(null);
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { pathname, query } = parse(req.url || "", true);
  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return res.end();
  }

  try {
    if (pathname === "/api/products" && req.method === "GET") {
      // support optional search query: /api/products?q=term
      const q = typeof query?.q === "string" ? query.q.trim().toLowerCase() : null;
      if (q) {
        const filtered = products.filter((p) => p.name.toLowerCase().includes(q));
        return sendJSON(res, 200, filtered);
      }
      return sendJSON(res, 200, products);
    }

    if (pathname === "/api/products" && req.method === "POST") {
      const body = await parseBody(req);
      const id = String(Date.now());
      const item = { id, ...(body || {}) };
      products.push(item);
      return sendJSON(res, 201, item);
    }

    // match /api/products/:id
    const productIdMatch = pathname?.match(/^\/api\/products\/(.+)$/);
    if (productIdMatch) {
      const id = productIdMatch[1];
      if (req.method === "GET") {
        const item = products.find((p) => p.id === id);
        if (!item) return sendJSON(res, 404, { message: "Not found" });
        return sendJSON(res, 200, item);
      }

      if (req.method === "PUT") {
        const body = await parseBody(req);
        let item = products.find((p) => p.id === id);
        if (!item) return sendJSON(res, 404, { message: "Not found" });
        item = Object.assign(item, body || {});
        products = products.map((p) => (p.id === id ? item : p));
        return sendJSON(res, 200, item);
      }

      if (req.method === "DELETE") {
        const exists = products.some((p) => p.id === id);
        if (!exists) return sendJSON(res, 404, { message: "Not found" });
        products = products.filter((p) => p.id !== id);
        return sendJSON(res, 200, { id });
      }
    }

    // fallback
    sendJSON(res, 404, { message: "Not found" });
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { message: "Internal server error" });
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock API server running at http://localhost:${PORT}/api`);
  console.log(`Endpoints: GET/POST /api/products, GET/PUT/DELETE /api/products/:id`);
});
