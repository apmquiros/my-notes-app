const express = require('express');
const cors = require('cors');
const notesRouter = require('./routes/notes');
require ('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

