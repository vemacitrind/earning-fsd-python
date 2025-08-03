// Write a node.js script to load a simple.html file on NodeJS server and print its contents

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.sendFile('simple.html');
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
