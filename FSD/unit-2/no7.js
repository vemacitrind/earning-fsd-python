// Write a program to demonstrate various methods of path module in Node.js.

const { log } = require("console")
const path = require("path")

let fullpath = path.join('master','Document','T4','password.txt')
log(fullpath)

let resPath = path.resolve('password.txt')
log(resPath)

let basename = path.basename(fullpath)
log(basename)

let basenameWithoutExt = path.basename(fullpath,".txt")
log(basenameWithoutExt)

let dirName = path.dirname(fullpath)
log(dirName)

let extName = path.extname(fullpath)
log(extName)

let parse = path.parse(resPath)
log(parse)

let isAbosulutePath = path.isAbsolute(fullpath)
log(isAbosulutePath)