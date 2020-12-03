const fs = require('fs');

const getNotes = function () {
    return 'This is a note... hahaha';
};

const addNote = function (title, body) {
    const notes = loadNotes();

    //Look through notes for duplicate titles
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    });

    if (duplicateNotes.length === 0) {
        //Push values passed in from app.js
        notes.push({
            title: title,
            body: body,
        });

        saveNotes(notes);
        console.log('New note added')
    } else {
        console.log('Duplicate note title found');
    }
};

//Pass in notes array
const saveNotes = (notes) => {
    const jsonData = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jsonData);
}

const loadNotes = () => {
    try {
        //Returns array of notes
        const dataBuffer = fs.readFileSync('notes.json');
        const jsonData = dataBuffer.toString();
        return JSON.parse(jsonData);
    } catch (e) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote
};