const http = require('http');
const express = require('express');

const app = express();
const dir = process.cwd();
const controller = require('./controller');

app.use(express.static(dir));
app.use(express.static(__dirname));

const server = http.createServer(app);

app.get('/files', function(req, res) {
    controller.getFiles(req, res, dir);
});

app.get('/', function(req, res) {
    res.redirect('index.html');
});


server.listen(3000);
