'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

// Connect to db
server.app.db = mongojs('place',['place','books']);

//Load plugins and start server
server.register([
  require('./routes/place'),require('./routes/book')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});
