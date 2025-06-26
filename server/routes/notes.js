const express = require('express');
const db = require('../db/database');
const router = express.Router();

//Get all notes
router.get('/', (req, res) => {
    db.all('SELECT * FROM notes ORDER BY updated_at DESC', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

//Get a single note
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM notes WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

//Create a new note
router.post('/', (req, res) => {
    const { title, content, tags } = req.body;
    const stmt = `
        INSERT INTO notes (title, content, tags) 
        VALUES (?, ?, ?)
    `;
    db.run(stmt, [title, content, tags], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

//Update note
router.put('/:id', (req, res) => {
    const { title, content, tags } = req.body;
    const stmt = `
        UPDATE notes
        SET title = ?, content = ?, tags = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    db.run(stmt, [title, content, tags, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
    });
});

//Delete note
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM notes WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

module.exports = router;