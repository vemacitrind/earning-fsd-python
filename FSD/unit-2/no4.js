// Write a node.js script to read a file and print its contents.

const { log } = require('console');
const fs =  require('fs')

fs.readFile('example.txt','utf-8',(err,data)=>{
    if(err) throw err;
    log(data);
}); //Asynchronous method

let data = fs.readFileSync('example.txt','utf-8'); //Synchronous method