const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;


app.get("/hello", (req, res) => {
  res.send("🟢 Hello from Midterm Project API!");
});

// DB test endpoint
app.get("/db", async (req, res) => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }, // Azure için gerekli
  });

  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`🟢 PostgreSQL bağlantısı başarılı! Zaman: ${result.rows[0].now}`);
  } catch (err) {
    console.error("DB bağlantı hatası:", err.message);
    res.status(500).send("🔴 DB bağlantı hatası: " + err.message);
  } finally {
    await pool.end();
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
