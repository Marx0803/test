 const http = require('http');
 const fs = require('fs');
 const _ = require('lodash');
 

 const server = http.createServer((req, res) => {
   /*console.log(`request made`);
   console.log(req.url, req.method);*/
   //lodash
   const num = _.random(0,20);
   console.log(num);
   
   let path = './views';

   const greet = _.once(() =>{
        console.log('hello ');
   });
   greet();
   /*const greet = () =>{
        console.log('hello ');
   }*/

   

   switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            //path += '/about.html';
            res.statusCode = 301;
            res.setHeader('Location', '/about');// 重新導向:/about 的頁面
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
   }

   res.setHeader('Content-Type', 'text/html');
   //send a htnl file
   fs.readFile(path, (err, data) => {
        if (err) {  
            console.log(err);
            res.end();
        } else {               
            res.end(data);
        }

   });
   //res.write('<p>可放html程式語言</p>')
    
 });

 const PORT = 3000;
 server.listen(PORT, 'localhost', () => {
   console.log(`listening for requests on port ${PORT}`);
 });