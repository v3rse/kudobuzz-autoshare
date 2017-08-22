// modules
//const ProfileHandler = require('../handlers').getHandler('profile');
const Joi = require('joi');

exports.register = (server, options, next) => {
  return next();
};


exports.register.attributes = {
  name: 'profile-routes',
};
