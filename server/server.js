import http from 'http';
const server=http.createServer((req,res)=>{
    if(req.url==="/")
    {
        res.write("HomePage")
        res.end();
    }
    else if(req.url==="/about")
    {
        res.writeHead(200,{"content-type":"text/csv"})
        res.end("<h1>About Page</h1>")
    }
     else if(req.url==="/data"&&req.method==="POST")
    {
        let body='';
        req.on("data",(chunk)=>{
            body+=chunk;
            
        })
        req.on("end",()=>{
          res.writeHead(200,{"content-type":"application/json"})
          const pdata=JSON.parse(body);
          res.end("data=",pdata);
        })
        res.end("<h1>About Page</h1>")
    }
    else{
         res.writeHead(404,{"content-type":"text/plain"})
        res.end("Error:URL Not Found")
    }

})
server.listen(3001,()=>{
    console.log('Server is working on port 3001')
})