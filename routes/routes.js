const fs = require('fs');
const path = require('path');
const router = require('express').Router()

    //API ROUTES
    //------------------------------------

    // Set up get route for /api/notes
    router.get('/api/notes', (req, res) => {
      //Read db.json file, return all saved notes as JSON
      res.json(notes);
    });

    // Set up post route for /api/notes
    router.post('/api/notes', (req, res) => {

      let noteNew = req.body;
      notes.push(noteNew);
      updateDb();
      return console.log('New Note Added' + noteNew.title);
    });

    //Retrieve note with specific id
    router.get('/api/notes/:id', (req, res) => {
      // Display JSON for indices of notes array for provided id
      res.json(notes[req.params.id]);
    });

    //Delete note with specific id
    router.delete('/api/notes/:id', (req, res) => {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log('Deleted Note with id' + req.params.id);
    });

    //VIEW ROUTES
    //------------------------------------

    // Display notes.html when '/notes' is accessed
    router.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    router.get('/', function(req,res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
  });
      //Update json file whenever note is added or deleted
      function updateDb() {
        fs.writeFile('db/db.json', JSON.stringify(notes, '\t'), err => {
          if (err) throw err;
          return true;
        });
      }


