const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer()
    .on('request', (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'html'
        });
        const pathToIndex = path.resolve(__dirname, 'index.html');
        const ind = fs.readFileSync(pathToIndex);
        const re = /{message}/;
        res.end(ind.toString().replace(re, 'Hi Dima'))
    })
    .listen(3000);