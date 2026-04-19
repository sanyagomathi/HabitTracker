require("dotenv").config();
const http = require("http");
const url = require("url");
const db = require("./db");

const PORT = process.env.PORT || 5000;

/* ---------- HELPERS ---------- */

function send(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

/* ---------- SERVER ---------- */

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const path = parsed.pathname;

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
    try {
      const body = await getBody(req);
      const { user_id, title, category, frequency, target, template_key } = body;

      if (!title) {
        send(res, 400, { error: "Title required" });
        return;
      }

      const sql = `
        INSERT INTO habits (user_id, title, category, frequency, target, template_key)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [user_id || 1, title, category, frequency, target, template_key || null],
        (err, result) => {
          if (err) return send(res, 500, { error: err });

          send(res, 201, {
            message: "Habit added",
            id: result.insertId,
          });
        }
      );
    } catch (err) {
      console.error("POST /api/habits ERROR:", err);
      send(res, 500, { error: "Server failed to parse request body" });
    }
    return;
  }

  /* ---------- SAVE ENTRY ---------- */
  if (req.method === "POST" && path === "/api/entries") {
    try {
      const body = await getBody(req);

      console.log("POST /api/entries hit");
      console.log("RAW BODY OBJECT:", body);

      const habit_id = body.habit_id;
      const entry_date = body.entry_date;
      const value = body.value;
      const status = body.status;
      const notes = body.notes;

      console.log("habit_id:", habit_id);
      console.log("entry_date:", entry_date);

      if (
        habit_id === undefined ||
        habit_id === null ||
        entry_date === undefined ||
        entry_date === null ||
        entry_date === ""
      ) {
        send(res, 400, { error: "habit_id and entry_date are required" });
        return;
      }

      const sql = `
        INSERT INTO habit_entries (habit_id, entry_date, value, status, notes)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          value = VALUES(value),
          status = VALUES(status),
          notes = VALUES(notes)
      `;

      db.query(
        sql,
        [habit_id, entry_date, value ?? null, status ?? null, notes ?? null],
        (err) => {
          if (err) {
            console.error("DB ERROR:", err);
            send(res, 500, { error: "Database error", details: err.message });
            return;
          }

          send(res, 201, { message: "Entry saved" });
        }
      );
    } catch (err) {
      console.error("POST /api/entries ERROR:", err);
      send(res, 500, { error: "Server failed to parse request body" });
    }

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
    try {
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
    } catch (err) {
      console.error("POST /api/login ERROR:", err);
      send(res, 500, { error: "Server failed to parse request body" });
    }

    return;
  }

  /* ---------- SIGNUP ---------- */
  if (req.method === "POST" && path === "/api/users") {
    try {
      const body = await getBody(req);
      const { name, email, password } = body;

      const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(sql, [name, email, password], (err) => {
        if (err) return send(res, 500, { error: err });
        send(res, 201, { message: "User created" });
      });
    } catch (err) {
      console.error("POST /api/users ERROR:", err);
      send(res, 500, { error: "Server failed to parse request body" });
    }

    return;
  }

  /* ---------- GET SINGLE HABIT ---------- */
  if (req.method === "GET" && path.startsWith("/api/habits/")) {
    const id = path.split("/").pop();

    db.query("SELECT * FROM habits WHERE id = ?", [id], (err, result) => {
      if (err) {
        send(res, 500, { error: "Database error" });
        return;
      }

      if (result.length === 0) {
        send(res, 404, { error: "Habit not found" });
        return;
      }

      send(res, 200, result[0]);
    });
    return;
  }

  /* ---------- NOT FOUND ---------- */
  send(res, 404, { error: "Route not found" });
});

/* ---------- START ---------- */

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});