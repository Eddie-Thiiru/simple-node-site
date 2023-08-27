const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let siteURL = new URL(req.url, "http://localhost:8080");
  let fileName =
    siteURL.pathname === "/" ? "./index.html" : `.${siteURL.pathname}.html`;

  fs.readFile(fileName, (err, data) => {
    if (err) {
      fs.readFile("404.html", (err, errData) => {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(errData);
      });
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
  });
});

server.listen(8080);
