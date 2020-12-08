const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    //Look through notes for duplicate titles
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        //Push values passed in from app.js
        notes.push({
            title: title,
            body: body,
        });

        saveNotes(notes);

        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Duplicate note title found'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();

    const filteredNotes = notes.filter((notes) => notes.title !== title);

    notes.length > filteredNotes.length ?
        console.log(chalk.green.inverse(`Note with title: '${title}' has been removed`))
        : console.log(chalk.red.inverse('No note found'));

    saveNotes(filteredNotes);
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

const listNotes = () => {
    console.log(chalk.cyan.inverse('My Notes: '))
    const getNotes = loadNotes();

    return getNotes.filter((note) => {
        console.log(`${note.title}`);
    })
};

const readNote = (title) => {
    const getNotes = loadNotes();
    const readNote = getNotes.find((note) => note.title === title)

    if (readNote) {
        console.log(chalk.green.inverse('Title: ' + readNote.title));
        console.log('Body: ' + readNote.body);
    }else{
        console.log(chalk.red.inverse("No matching note found"));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};