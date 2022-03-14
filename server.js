// Requires Modules for the project
const express = require('express');
const {notes} = require('./db/db.json');
const path = require('path');
const fs = require('fs');

//Setting the server and initiating the app
const app = express();
const PORT = process.env.PORT || 3000

//Parse incoming string or array data
app.use(express.urlencoded( {extended: true}));
//Parse incoming json data
app.use(express.json());
//Parse the path route 
app.use(express.static(path.join(__dirname, 'public')));

// Calling and Including the roots for the folders
app.get('api/notes', (req, res) => {
    res.json(notes.slice(1))
})

//HTML call
app.get('/' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Note HTML call
app.get('/notes' , (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Setting up the note routes for the API
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Creating the function to create a note
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
    notesArray= [] 

    if(notesArray.length === 0)
    notesArray.push(0)

    body.id = notesArray[0]
    notesArray[0] ++;


    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify({notes: notesArray }, null, 2)
    );
    return newNote;
}
app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, notes)
    res.json(newNote)
})

//Creating the function to deleted a note
function deleteNote (id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if(note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(path.join(__dirname, './db/db.json'),
            JSON.stringify({notes: notesArray}, null, 2)
            );
            break;
        }
    }
}
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes)
    res.json(true)

});

// Start Listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});