/* 
  ? The modem's public IP cannot be exposed via port forwarding, this folder alone is to be installed
  ? and ran on a spare phone/server/pi if the user is using someone else's server as a proxy to manage their 
  ? modem
*/

const http = require("http");
const httpProxy = require("http-proxy");
const net = require("net");

/* 
    ! Make sure to npm install http-proxy on the proxy server 
*/

// === Config ===
const URL = "http://192.168.1.254";
const MODEM_IP = "192.168.1.254";
const PORT = 3000;

// === Create Proxy Server ===
const proxy = httpProxy.createProxyServer({});

// === Modem Health Check (TCP ping) ===
const checkModemHealth = () => {
  const socket = new net.Socket();
  const timeout = 3000; // 3 seconds timeout

  socket.setTimeout(timeout);

  socket.on("connect", () => {
    console.log("[Modem] Modem is reachable.");
    socket.destroy();
  });

  socket.on("timeout", () => {
    console.log("[Modem] Modem health check timeout.");
    socket.destroy();
  });

  socket.on("error", (err) => {
    console.log("[Modem] Modem health check error:", err.message);
    socket.destroy();
  });

  socket.connect(80, MODEM_IP);
};

// === Create and Start HTTP Server ===
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: URL }, (err) => {
    console.error("[Proxy] Proxy error:", err.message);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad gateway: Unable to reach modem.");
  });
});

server.listen(PORT, () => {
  console.log(`[Server] Proxy running on port ${PORT}`);
});

// === Handle global proxy errors too ===
proxy.on("error", (err, req, res) => {
  console.error("[Proxy] Global proxy error:", err.message);

  if (res && !res.headersSent) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Proxy error");
  }
});

// === Kick Everything Off ===
setInterval(checkModemHealth, 60000); // Every 1 minute
