const http = require('http');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');

http.createServer()
    .on('request', (req, res) => {
        const { url, method } = req;
        if(method === 'GET') {
            const pathToIndex = path.resolve(__dirname, 'index.html');
            const re = /{message}/;
            fs.createReadStream(pathToIndex)
            .on('data', (chunk) => {
                res.writeHead(200, {
                    'Content-Type': 'html'
                });
                res.write(chunk.toString().replace(re, 'avada kedavra')) 
            })
            .on('end', () => {
                res.end();
            })
            .on('error', (err) => {
                res.statusCode = 404;
                res.end(err);
            })
        }    
    })
    .listen(3000);

/*
Tried to complete task this way but got infinite load even when result was displayed
*/

/*
http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'html'
        });
        const re = /{message}/;
        const pathToIndex = path.resolve(__dirname, 'index.html');
        const stream = fs.createReadStream(pathToIndex).pipe(through2(function (chunk) {
            const updatedRes = chunk.toString().replace(re, 'Hi Dima');
            this.push(updatedRes);
        }));
        stream.pipe(res);
    })
    .listen(3000);
*/

