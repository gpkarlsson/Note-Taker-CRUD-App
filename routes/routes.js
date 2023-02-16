const fs = require('fs');
const path = require('path');

module.exports = app => {
  
  fs.readFile('db/db.json', 'utf-8', (err, data) => {

    if (err) throw err;

    let notes = JSON.parse(data);
    
    //API ROUTES

    app.get('/api/notes', (req, res) => {
      res.json(notes);
    });

    app.post('/api/notes', (req, res) => {
      let noteNew = req.body;
      notes.push(noteNew);
      updateDb();
      return console.log('New Note Added' + noteNew.title);
    });

    app.get('/api/notes/:id', (req, res) => {
      res.json(notes[req.params.id]);
    });

    app.delete('/api/notes/:id', (req, res) => {
      notes.splice(req.params.id, 1);
      updateDb();
      console.log('Deleted Note with id' + req.params.id);
    });

    app.get('/notes', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  })

}