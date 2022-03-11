const express = require('express');
//const requestid = require('express-request-id');
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');
const PORT = 3001;
const app = express();
const {notesArray} = require('../db/db.json');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(requestID());

//return index file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // return notes file
  app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/notes.html');
  });

// return db file
app.get('/api/notes', (req, res) => res.json(db));

// function to add the post to the file
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return notesArray;
  };

// post request to add the post to the file
app.post('/api/notes', (req, res) => {
    createNewNote(req.body, notesArray);
    res.json(db);
});

// // trying to add the id, not working
// app.post('/api/notes', (req, res, next) => {
//   createNewNote(req.body, notes)
//   res.json(db)
//   res.send(req.id);
//   next();
// });

  //this connects it to our port
  app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
  });