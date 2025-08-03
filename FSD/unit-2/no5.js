// Write a node.js script to write contents to the file in original manner. Delete file after finishing writing.

const { log } = require('console');
const fs = require('fs');

fs.writeFileSync('example_write.txt','This is going to be an example')
log('File written successfully.'); //Synchrouns

fs.unlinkSync('example_write.txt');
console.log('File deleted.');

fs.writeFile('example_write.txt', 'This is going to be an example', (err) => {
    if (err) throw err;
    log("Task completed!")
}); //Asynchrouns


fs.unlink('example_write.txt', (err) => {
    if (err) throw err;
    console.log('File deleted.');
})
