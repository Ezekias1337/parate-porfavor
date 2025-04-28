/* 
  ? The modem's public IP cannot be exposed via port forwarding, this folder alone is to be installed
  ? and ran on a spare phone/server/pi if the user is using someone else's server as a proxy to manage their 
  ? modem
*/


const http = require("http");
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});

const URL = "your_url_here";
const PORT = 3000;

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: URL });
});

server.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});

// Function to update DuckDNS
function updateDuckDNS() {
  const token = 'your_token_here'; // Replace with your DuckDNS token
  const domain = 'your_domain_here';
  const url = `https://www.duckdns.org/update?domains=${domain}&token=${token}&ip=`;

  https.get(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      console.log(`DuckDNS update response: ${data}`);
    });
  }).on('error', (err) => {
    console.log('Error updating DuckDNS:', err);
  });
}

// Update DuckDNS every 10 minutes (600,000 ms)
setInterval(updateDuckDNS, 600000);