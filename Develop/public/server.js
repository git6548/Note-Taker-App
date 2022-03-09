const express = require('express');
const path = require('path');
const db = require('../db/db.json');
const fs = require('fs');
const PORT = 3001;
const app = express();
const {notes} = require('../db/db.json');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//get request at route notes to return what is in db

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/notes.html');
  });


app.get('/api/notes', (req, res) => res.json(db));


function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return note;
  }

// post request
app.post('/api/notes', (req, res) => {
    createNewNote(req.body, notes)
    res.json(db)
})

  //this connects it to our port
  app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
  });


  //all speculation after this point

//this part is not working
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'notes.html' ));
//   });
  
  //this part is working

  
  // //this part is working but isn't yet writing to db
  // app.post('/notes', (req, res) => {
  //     console.log(">>> incoming post request: ", req.method);
  //     res.json(req.body);
  //   })
  // this part is working



  
  

    // app.get('/notes', (req, res) => {
    //     let results = notes;
    //   if (req.query) {
    //       results = createNewNote(req.query, results);
    //     }
    //     res.json(results);
    //   });

    //module.exports = 