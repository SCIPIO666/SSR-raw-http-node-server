const http=require('http');
const fs=require('fs');
const PORT = 3000;
const path = require("path");

const server=http.createServer((req,res)=>{

console.log(req.url)
let filePath='';
//handle static public files
if(req.url==="/styles.css"){
    console.log(`Request for: ${req.url}`);
    const cssPath=path.join(__dirname,"public","styles.css");
    fs.readFile(cssPath,(err,data)=>{
        if(err){
         res.writeHead(500);
        res.end("Css Not Found");
        return;           
        }
     res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    })
    return;
}
if(req.url==="/script.js"){
    console.log(`Request for: ${req.url}`);
    const jsPath=path.join(__dirname,"public","script.js");
    fs.readFile(jsPath,(err,data)=>{
        if(err){
         res.writeHead(500);
        res.end("Server Error");
        return;           
        }
     res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    })
    return;
}


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