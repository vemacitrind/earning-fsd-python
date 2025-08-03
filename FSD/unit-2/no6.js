// Write a program to sort an integer array, where all elements are available in a file separated by white space.

const { log } = require('console');
const fs = require('fs');

let data = fs.readFileSync('number.txt','utf-8').split(" ").join(",")
arr = JSON.parse("["+data+"]")
sorted_arr = arr.sort((a,b)=>a-b)
log(sorted_arr)