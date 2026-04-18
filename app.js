const http = require("http");

const u1 = new URL("https://portal.svkm.ac.in/MPSTME-NM-M/markAttendanceForm");
const u2 = new URL("https://www.google.com/search?q=google&ie=UTF-8");


console.log("URL 1");
console.log("Host:", u1.host);
console.log("Path:", u1.pathname);

console.log("\nURL 2");
console.log("Host:", u2.host);
console.log("Path:", u2.pathname);
console.log("Query:", u2.search);


http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.write("<h2>URL 1</h2>");
  res.write("Host: " + u1.host + "<br>");
  res.write("Path: " + u1.pathname + "<br><br>");

  res.write("<h2>URL 2</h2>");
  res.write("Host: " + u2.host + "<br>");
  res.write("Path: " + u2.pathname + "<br>");
  res.write("Query: " + u2.search + "<br>");

  res.end();
}).listen(3000);

console.log("Open http://localhost:3000");