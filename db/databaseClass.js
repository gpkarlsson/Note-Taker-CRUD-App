const fs = require('fs');
const util = require('util');

const noteData = './db/db.json';

//Asynchronous read/write using util and fs
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Database Class that handles data reading and writing
class Database {
    async readNotes() {
        try {
            const rawNotes = await readFileAsync(noteData, 'UTF8');
            return rawNotes ? JSON.parse(rawNotes) : [];
        } catch (error) {
            throw error;
        }
    }
    //Add new note 
    async addNote(data) {
        try {
            await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
                console.log("New note added");
            }
            );
        } catch (error) {
            throw error;
        }
    }
    //Delete note
    async deleteNote(data) {
        try {
            await writeFileAsync(noteData, JSON.stringify(data, null, '\t'))
                .then(() => {
                    console.log('Deleted note');
                });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Database();