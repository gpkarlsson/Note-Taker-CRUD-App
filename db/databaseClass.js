const fs = require('fs');
const util = require('util');

const noteData = '../db/db.json';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Database {
    async readNotes() {
        try {
            const rawNotes = await readFileAsync(noteData, 'UTF8');
            return rawNotes ? JSON.parse(rawNotes) : [];
        } catch (error) {
            throw error;
        }
    }

    async addNote(data) {
        try {
            await writeFileAsync(noteData, JSON.stringify(data, null, "\t")).then(() => {
                console.log("New note added.");
            }
            );
        } catch (error) {
            throw error;
        }
    }
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