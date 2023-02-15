const PORT = process.env.PORT || 8000;
const app = express();

//API Route "GET"
app.get('/api/notes', (req, res) => {
  readFileAsync('./db/db.json', 'utf-8').then(function(data) {
    let notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

//API Route "POST"

app.post('/api/notes', (req, res) => {
  const note = req.body;
  readFileAsync('./db/db.json', 'utf-8').then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1;
    notes.push(note);
    return notes;
  }).then(function(notes) {
    writeFileAsync('/Develop/db/db.json', JSON.stringify(notes))
    res.json(note);
  })
});


// app.post('/api/notes', (req, res) =>

// )

//HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

