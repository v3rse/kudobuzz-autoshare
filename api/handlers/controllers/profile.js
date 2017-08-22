const Boom = require('boom');
const ProfileModel = require('../../model').getModel('profile');

class ProfileController {
  create(request, reply) {
    let profile = request.payload;
    ProfileModel
      .create(profile)
      .then((data) => {
        reply(data).code(200);
      })
      .catch(e => reply(Boom.badRequest(e)));
  }
}


module.exports = ProfileController;
