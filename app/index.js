const http = require("http");

const PORT = 3000;

let requestCount = 0;

const server = http.createServer((req, res) => {
  // Count every HTTP request except /metrics
  if (req.url !== "/metrics") {
    requestCount++;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "healthy",
        service: "secure-observable-app"
      })
    );
    return;
  }

  if (req.url === "/metrics") {
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end(`# HELP app_requests_total Total number of HTTP requests
# TYPE app_requests_total counter
app_requests_total ${requestCount}

# HELP app_health_status Health status of the application
# TYPE app_health_status gauge
app_health_status 0
`);

    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
