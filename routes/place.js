'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

  // GET place
  server.route({
      method: 'GET',
      path: '/place',
      handler: function (request, reply) {

          db.place.find((err, docs) => {

              if (err) {
                  return reply(Boom.wrap(err, 'Internal MongoDB error'));
              }

              reply(docs);
          });

      }
  });

  // GET place by _id
  server.route({
    method: 'GET',
    path: '/place/{id}',
    handler: function (request, reply) {
        db.place.findOne({
            _id:db.ObjectId(request.params.id)
        }, (err, doc) => {

            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (!doc) {
                return reply(Boom.notFound());
            }

            reply(doc);
        });

    }
  });

  return next();
};

exports.register.attributes = {
  name: 'routes-place'
};
