const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'notes.db'), (err) => {
    if (err) return console.error(err.message);
    console.log('✅ Connected to SQLite DB');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tags TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP    
        )    
    `, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Notes table is ready');
    }
  });
});

module.exports = db;