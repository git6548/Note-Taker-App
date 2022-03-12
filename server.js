const express = require('express');
const uniqid = require('uniqid'); 
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();
//const {notesArray} = require('./db/db.json');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(requestID());
app.use(express.static('./public'));

//return index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  // return notes file
  app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
  });


// return db file
app.get('/api/notes', (req, res) => {
  res.json(db)
});

// function to add the post to the file
function createNewNote(body, db) {
    const note = {
      title: body.title,
      text: body.text,
      id: uniqid()
    };
    console.log(note)
    db.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(db, null, 2)
    );
    return db;
  };

// post request to add the post to the file
app.post('/api/notes', (req, res) => {
    let x = createNewNote(req.body, db);
    res.json(x);
 
});

// // trying to add the id, not working
// app.post('/api/notes', (req, res, next) => {
//   createNewNote(req.body, notesArray)
//   res.json(db)
//   res.send(req.id);
//   next();
// });

  //this connects it to our port
  app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
  });

