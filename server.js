const http=require('http');
const fs=require('fs');
const PORT = 3000;
const path = require("path");

const server=http.createServer((req,res)=>{

console.log(req.url)
let filePath='';

//routes
    if(req.url==="/"){
        filePath=path.join(__dirname,"views","index.html")
    }else if(req.url==="/contact"){
        filePath = path.join(__dirname, "views", "contact-me.html");
    }else if(req.url==="/about"){
        filePath = path.join(__dirname, "views", "about.html");
    }else{
        filePath = path.join(__dirname, "views", "404.html");
        res.statusCode = 404;
    }

fs.readFile(filePath,(err,data)=>{
    if(err){
        res.writeHead(500);
        res.end("server error");
        return;
    }
    res.writeHead(200,{"Content-Type": "text/html"})
    res.end(data)
})


})

server.listen(PORT,"localhost",()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})