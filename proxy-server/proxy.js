/* 
  ? The modem's public IP cannot be exposed via port forwarding, this folder alone is to be installed
  ? and ran on a spare phone if the user is using someone else's server as a proxy to manage their 
  ? modem
*/


const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: "http://192.168.1.254" });
});

server.listen(9000, () => {
  console.log("Proxy running on port 9000");
});
