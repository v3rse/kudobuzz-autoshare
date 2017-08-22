// modules
const MessageHandler = require('../handlers').getHandler('message');
const Joi = require('joi');

exports.register = (server, options, next) => {
  server.route({
    method: 'POST',
    path: '/message/schedule',
    config: {
      description: 'Schedule a message to be sent',
      notes: 'Queues up a message to be sent by a cron job at a preset time',
      tags: ['api'],
      handler: MessageHandler.schedule,
      validate: {
        payload: {
          profile: Joi.string(),
          content: Joi.string(),
        },
      },
    },
  });

  return next();
};


exports.register.attributes = {
  name: 'message-routes',
};
