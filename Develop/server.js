const express = require('express.js');
const fs = require('fs');
const path = require('path');
const dataBase = require('./db/db.json');
const app = express();
const util = require('util');
const PORT = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'))
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});





//   The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

// The following HTML routes should be created:

//     TODO: GET /notes should return the notes.html file.

//    TODO: GET * should return the index.html file.

// The following API routes should be created:

//     TODO: GET /api/notes should read the db.json file and return all saved notes as JSON.

//    TODO: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


// *Bonus* 
// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. As a bonus, see if you can add the DELETE route to the application using the following guideline:

//     DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property,
//      and then rewrite the notes to the db.json file.

