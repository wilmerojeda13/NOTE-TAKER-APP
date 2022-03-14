// Requires Modules for the project
const express = require('express')
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');


//Setting the server and initiating the app
const app = express();
const PORT = process.env.PORT || 5000;

//Parse incoming string or array data
app.use(express.urlencoded( {extended: true}));
//Parse incoming json data
app.use(express.json());
//Parse the path route 
app.use(express.static( 'public'));

//HTML call
app.get('/' , function (req, res)  {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// Note HTML call
app.get('/notes' , function (req, res)  {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// Setting up the note routes for the API
app.route('/api/notes', function(req,res) {
    res.json(notes);
})

// Add post function to create a note 
.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, '/db/db.json')
    let newNote = req.body

    // Allow no to test the original note by assingin an id
let higestId = 99;

// For loop to find the highest id 
for (let i = 0; i < notes.length; i++) {
    let individualNote = notes [1]

    if(individualNote.id > higestId) {
        higestId = individualNote.id
    }
}
//Assing id to new note
newNote.id = higestId + 1;
notes.push(newNote)

fs.writeFile(jsonFilePath, JSON.stringify(notes),  function(err) {
    if (err) {
        return console.log(err)
    }
    console.log('Your note is saved')
})
res.json(newNote)

});



