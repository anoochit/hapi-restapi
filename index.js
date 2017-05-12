'use strict';

const Hapi = require('hapi');
const mongojs = require('mongojs');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: process.env.PORT || 3000
});

var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost/place';

// Connect to db
server.app.db = mongojs(uristring,['place','books']);

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
