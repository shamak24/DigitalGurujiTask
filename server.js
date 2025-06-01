import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");
    console.log("Resolved index.html path:", filePath); // Debug log
    fs.access(filePath, fs.constants.F_OK, (accessErr) => {
      if (accessErr) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("index.html Not Found");
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
