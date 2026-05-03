/*
   Course: WEB340 – Full Stack Development II

   Chapter 6 Assignment: Fantasy Game Character Creation
   Author: Jonathan Cantu
   Date:   May 2nd, 2026

   Filename: server.js
*/

"use strict";

const http = require('http');
const url = require('url');
const { LocalStorage } = require('node-localstorage');

// Initialize LocalStorage (persists data in a folder named 'scratch')
const localStorage = new LocalStorage('./scratch');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Set default response header
  res.setHeader('Content-Type', 'application/json');

  // ROUTE 1: POST
  if (pathname === '/create' && req.method === 'POST') {
    const character = {
      charClass: query.charClass,
      gender: query.gender,
      funFact: query.funFact
    };

    localStorage.setItem('gameCharacter', JSON.stringify(character));

    res.writeHead(201);
    res.end(JSON.stringify({ message: 'Character created!', character }));
  }

  // ROUTE 2: GET
  else if (pathname === '/view' && req.method === 'GET') {
    const savedCharacter = localStorage.getItem('gameCharacter');

    if (savedCharacter) {
      res.writeHead(200);
      res.end(savedCharacter);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'No character found' }));
    }
  }

  // ROUTE 3: DELETE
  else if (pathname === '/delete' && req.method === 'DELETE') {
    localStorage.removeItem('gameCharacter');
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Character deleted successfully' }));
  }

  // 404 Not Found
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server only if this file is run directly
if (require.main === module) {
  server.listen(3000, () => {
    console.log('Fantasy Server listening on port 3000');
  });
}

module.exports = server;
