//Dependencies
const express = require('express');
const router = express.Router();
//Generates random ID
const uuid = require('uuid');
//Database class object
const db = require('../db/databaseClass');

const notes = require('../db/db.json');

//Gets notes
router.get('/api/notes', async function (req, res) {
    const notes = await db.readNotes();
    res.json(notes);
});

//Adds new note to db.json file
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

//Deletes notes
router.delete('/api/notes/:id', async function (req, res) {
    //Selects note to delete by id
    const noteToDelete = req.params.id;

    // Notes that are in the db.json file
    const currentNotes = await db.readNotes();

    //Sorts through notes file and generates a new array without the note that will be deleted
    const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

    //Returns new array without deleted note to the Database class
    await db.deleteNote(newNoteData);

    return res.send(newNoteData);
});

module.exports = router;

