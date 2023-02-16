const express = require('express');
const fs = require('fs');
// fs.readFile = undefined;
const path = require('path');
const dataBase = require('./db/db.json');
const app = express();
const util = require('util');

const routes = require('./routes/routes')
//  Handling Async Processes
const readFileAsync = util.promisify(fs.readFile);
// util.promisify = function (writeFile) {
//   return undefined;
// };
const writeFileAsync = util.promisify(fs.writeFile);
//readFileAsync
//writeFileAsync


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static middleware
app.use(express.static('./public'));

//API Route "DELETE"
app.delete('/api/notes/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  readFileAsync('db/db.json', 'utf-8').then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = []
    for (let i = 0; i < notes.length; i++) {
      if (idToDelete !== notes[i].id) {
        newNotesData.push(notes[i])
      }
    }
    return newNotesData
  }).then(function(notes) {
    writeFileAsync('db/db.json', JSON.stringify(notes))
    res.send('Saved Successfully');
  })
})





//   The application should have a db.json file on the back end that will be used to store and retrieve notes using the fs module.

// The following HTML routes should be created:

//     //TODO: GET /notes should return the notes.html file. done

//    TODO: GET * should return the index.html file.

// The following API routes should be created:

//     TODO: GET /api/notes should read the db.json file and return all saved notes as JSON.

//    TODO: POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


// *Bonus*
// You haven’t learned how to handle DELETE requests, but this application has that functionality in the front end. As a bonus, see if you can add the DELETE route to the application using the following guideline:

//     DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property,
//      and then rewrite the notes to the db.json file.

