require("dotenv").config();
const http = require("http");
const url = require("url");
const db = require("./db");

const PORT = process.env.PORT || 5000;

/* ---------- HELPERS ---------- */

// Send JSON response
function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5174",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

// Read POST body
function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", () => resolve(body ? JSON.parse(body) : {}));
  });
}

/* ---------- SERVER ---------- */

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;

// 200 -> success with content, 204 -> success with no content

  // CORS preflight
  if (req.method === "OPTIONS") {
    send(res, 204, {});
    return;
  }

  /* ---------- TEST ---------- */
  if (req.method === "GET" && path === "/") {
    send(res, 200, { message: "Backend running!" });
    return;
  }

  /* ---------- GET HABITS ---------- */
  if (req.method === "GET" && path === "/api/habits") {
    db.query("SELECT * FROM habits", (err, result) => {
      if (err) return send(res, 500, { error: err });
      send(res, 200, result);
    });
    return;
  }

  /* ---------- ADD HABIT ---------- */
  if (req.method === "POST" && path === "/api/habits") {
    const body = await getBody(req);

    const { user_id, title, category, frequency, target } = body;

    if (!title) {
      send(res, 400, { error: "Title required" });
      return;
    }

    const sql = `
      INSERT INTO habits (user_id, title, category, frequency, target)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [user_id || 1, title, category, frequency, target],
      (err, result) => {
        if (err) return send(res, 500, { error: err });

        send(res, 201, {
          message: "Habit added",
          id: result.insertId,
        });
      }
    );
    return;
  }

  /* ---------- SAVE ENTRY ---------- */
  if (req.method === "POST" && path === "/api/entries") {
    const body = await getBody(req);

    const { habit_id, entry_date, value, status, notes } = body;

    const sql = `
      INSERT INTO habit_entries (habit_id, entry_date, value, status, notes)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [habit_id, entry_date, value, status, notes],
      (err, result) => {
        if (err) return send(res, 500, { error: err });

        send(res, 201, { message: "Entry saved" });
      }
    );
    return;
  }

  /* ---------- GET ENTRIES ---------- */
  if (req.method === "GET" && path.startsWith("/api/entries/")) {
    const id = path.split("/").pop();

    db.query(
      "SELECT * FROM habit_entries WHERE habit_id = ?",
      [id],
      (err, result) => {
        if (err) return send(res, 500, { error: err });
        send(res, 200, result);
      }
    );
    return;
  }

  /* ---------- LOGIN ---------- */

  if (req.method === "POST" && path === "/api/login") {
  const body = await getBody(req);
  const { email, password } = body;

  if (!email || !password) {
    send(res, 400, { error: "Email and password required" });
    return;
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      send(res, 500, { error: "Database error" });
      return;
    }

    if (result.length === 0) {
      send(res, 401, { error: "Invalid email or password" });
      return;
    }

    send(res, 200, {
      message: "Login successful",
      user: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
      },
    });
  });

  return;
}
  /* ---------- SIGNUP ---------- */

  if (req.method === "POST" && path === "/api/users") {
    const body = await getBody(req);

    const { name, email, password } = body;

    const sql = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [name, email, password],
      (err, result) => {
        if (err) return send(res, 500, { error: err });

        send(res, 201, { message: "User created" });
      }
    );
    return;
  }

  if (req.method === "GET" && path.startsWith("/api/habits/")) {
  const id = path.split("/").pop();

  db.query(
    "SELECT * FROM habits WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        send(res, 500, { error: "Database error" });
        return;
      }

      if (result.length === 0) {
        send(res, 404, { error: "Habit not found" });
        return;
      }

      send(res, 200, result[0]);
    }
  );
  return;
}

  /* ---------- NOT FOUND ---------- */
  send(res, 404, { error: "Route not found" });
});

/* ---------- START ---------- */

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});