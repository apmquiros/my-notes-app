const express = require('express');
const cors = require('cors');
const notesRouter = require('./routes/notes');
const { Pool } = require('pg');
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        "https://apmquiros.github.io",
        "http://localhost:4200"
    ]
}));
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('✅ Backend is running. Use /api/notes.');
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ connected: true, time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false, error: err.message });
  }
});

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title TEXT,
        content TEXT,
        tags TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Connected to Postgres & ensured notes table');
  } catch (err) {
    console.error('❌ Postgres connection failed:', err);
  }
})();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

