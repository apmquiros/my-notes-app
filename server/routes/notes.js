const express = require('express');
const router = express.Router();

// ✅ GET all notes
router.get('/', async (req, res) => {
  const pool = req.pool;
  try {
    const result = await pool.query('SELECT * FROM notes ORDER BY updated_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ✅ POST create note
router.post('/', async (req, res) => {
  const pool = req.pool;
  const { title, content, tags } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO notes (title, content, tags) VALUES ($1, $2, $3) RETURNING *`,
      [title, content, tags]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ✅ PUT update note
router.put('/:id', async (req, res) => {
  const pool = req.pool;
  const { id } = req.params;
  const { title, content, tags } = req.body;
  try {
    const result = await pool.query(
      `UPDATE notes SET title = $1, content = $2, tags = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *`,
      [title, content, tags, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// ✅ DELETE note
router.delete('/:id', async (req, res) => {
  const pool = req.pool;
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM notes WHERE id = $1`, [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
