// modules
const ProfileHandler = require('../handlers').getHandler('profile');
const Joi = require('joi');

exports.register = (server, options, next) => {
  server.route({
    method: 'POST',
    path: '/profile/create',
    config: {
      description: 'Create profile for app social media connection',
      notes: 'Accepts credentials and settings required to forward messages for this social media page',
      tags: ['api'],
      handler: ProfileHandler.create,
      validate: {
        payload: {
          name: Joi.string(),
          cron: Joi.string(),
          type: Joi.string(),
          key: Joi.string(),
          secret: Joi.string(),
          cron: Joi.string(), 
        },
      },
    },
  });
  return next();
};


exports.register.attributes = {
  name: 'profile-routes',
};
