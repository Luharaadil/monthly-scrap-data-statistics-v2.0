import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const APP_SCRIPT_EXEC_URL = "https://script.google.com/macros/s/AKfycbwgP4jhdt0rom8RB3r3yvc42Xg-kgB4FgJ2DQTVOFHTir1g6mVFjCAMW5BB0dpbFbSARg/exec";

  // API Proxy routes to avoid CORS
  app.get("/api/getCustomRanges", async (req, res) => {
    try {
      const url = `${APP_SCRIPT_EXEC_URL}?action=getCustomRanges&t=${Date.now()}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (e) {
      console.error("Error proxying getCustomRanges:", e);
      res.status(500).json({ error: "Failed to proxy getCustomRanges" });
    }
  });

  app.get("/api/getData", async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const url = `${APP_SCRIPT_EXEC_URL}?action=getData&startDate=${startDate || '2020-01-01'}&endDate=${endDate || '2030-12-31'}&t=${Date.now()}`;
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (e) {
      console.error("Error proxying getData:", e);
      res.status(500).json({ error: "Failed to proxy getData" });
    }
  });

  app.post("/api/saveCustomRanges", async (req, res) => {
    try {
      const response = await fetch(APP_SCRIPT_EXEC_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(req.body)
      });
      const text = await response.text();
      try {
        res.json(JSON.parse(text));
      } catch {
        res.send(text);
      }
    } catch (e) {
      console.error("Error proxying saveCustomRanges:", e);
      res.status(500).json({ error: "Failed to proxy saveCustomRanges" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
