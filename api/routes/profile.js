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
          name: Joi.string().alphanum().min(3).max(30).required(),
          cron: Joi.string(),
          type: Joi.string().alphanum().min(3).max(30).required(),
          token: Joi.string().required(),
          page_id: Joi.string().required(),
        },
      },
    },
  });
  return next();
};


exports.register.attributes = {
  name: 'profile-routes',
};
