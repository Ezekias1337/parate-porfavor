import express, { Request, Response } from "express";
import axios from "axios";
import { createProxyMiddleware, Options } from "http-proxy-middleware";

const app = express();
const PORT = 3000;

// Store session cookies in memory (this can be replaced with a database or persistent storage)
let sessionCookie: string = "";

// Middleware to handle authentication
app.post("/login", async (req: Request, res: Response) => {
  const { username, password, token } = req.body;

  try {
    // Simulate the login request to the router
    const response = await axios.post("http://192.168.1.254/login.cgi", null, {
      params: {
        UserName: username,
        PassWord: password,
        "x.X_HW_Token": token,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 ...", // Use a valid User-Agent string
      },
    });

    // Store the session cookie
    const cookies = response.headers["set-cookie"];
    sessionCookie = (cookies && cookies.join("; ")) || "";

    res.json({ success: true });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Proxy device info request
app.get(
  "/device-info",
  createProxyMiddleware({
    target: "http://192.168.1.254", // Target router URL
    changeOrigin: true,
    pathRewrite: {
      "^/device-info": "/html/ssmp/deviceinfo/deviceinfo.asp",
    },
    onProxyReq: (proxyReq: any) => {
      // Add session cookie to the request
      if (sessionCookie) {
        proxyReq.setHeader("Cookie", sessionCookie);
      }
    },
  } as Options)
);

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
