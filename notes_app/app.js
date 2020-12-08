const validator = require('validator');
const fs = require('fs');
const yargs = require('yargs');
//Notes utility
const notes  = require('./notes');

//Customize yargs version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
      title: {
          describe: 'Note title',
          demandOption: true,
          type: 'string'
      },
      body: {
          describe: 'Note body',
          demandOption: true,
          type: 'string'
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
});

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
});

//Read a note
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        notes.readNote(argv.title);
    }
});

//List notes
yargs.command({
    command: 'list',
    describe: 'list the notes',
    handler: () => {
        notes.listNotes();
    }
})

yargs.parse();







































/*
const add = require('./utils');
const sum = add(98, 675);
console.log(sum);
*/
