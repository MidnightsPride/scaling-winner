const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs')

var uniqid = require('uniqid');

app.use(express.static('public'))
app.use(express.json())

// API Route START
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body

    //gives a random ID
    newNote.id = uuidv4()

    //adds the note object to the array
    db.push(newNote)

    //update the json file with the new object
    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    //responds with the note object used
    res.json(db)
})

app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) =>
        note.id !== req.params.id)

    // update the db.json file to reflect the modified notes array
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb))

    // send that removed note object back to user
    readFile.json(newDb)
})
// API Route END

//HTML Route START
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // GET * should return the index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  })
// HTML Route END

app.listen(PORT, () => {
    console.log(`Server available at localhost${PORT}`);
  });