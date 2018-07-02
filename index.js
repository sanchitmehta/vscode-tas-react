// @ts-check
const express = require('express');
const http = require('http');
const fs = require('fs');

// Azure App Service will set process.env.port for you, but we use 3000 in development.
const PORT = process.env.PORT || 3001;

// Create the express routes
let app = express();
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile('build/index.html');
});

app.get('/api', (req, res) => {
  res.type('json');
  res.end('{ "message": "Welcome to React on Azure" }');
});

// Create the HTTP server.
let server = http.createServer(app);
server.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});
