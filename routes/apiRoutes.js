const express = require('express');
const router = express.Router();
//Generates random ID
const uuid = require('uuid');
//
const db = require('../db/databaseClass');

const notes = require('../db/db.json');

router.get('/api/notes', async function (req, res) {
    res.json(notes);
});

router.post('/api/notes', async function (req, res) {
    const currentNotes = await db.readNotes();
    let newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
    };

    await db.addNote([...currentNotes, newNote]);

    return res.send(newNote);
});

router.delete('/api/notes/:id', async function (req, res) {
    const noteToDelete = req.params.id;
    
    const currentNotes = await db.readNotes();

    const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

    await db.deleteNote(newNoteData);
    
    return res.send(newNoteData);
});

module.exports = router;

