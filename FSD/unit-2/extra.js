//OS module

const { log } = require("console");
const os = require("os");

log("os.platform()" + os.platform())
log("os.arch()" + os.arch())
log("os.cpus()" + os.cpus())
log("os.totalmem()", os.totalmem()/1024/1024/1024 ,"GB")
log("os.freemem()", os.freemem()/1024/1024/1024 ,"GB")
log('os.uptime()', os.uptime(),'sec');
log("os.hostname()",os.hostname())
log("os.homedir()",os.homedir());
log("os.tmpdir()",os.tmpdir());
log("os.userinfo()",os.userInfo())
log("os.type()",os.type())

// const http = require('http')

// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/html'})
//     res.write("<h1>Hello world!</h1>");
//     res.end();
// }).listen(8000);