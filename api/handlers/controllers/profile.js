const Boom = require('boom');
const schedule = require('node-schedule');
const FacebookJob = require('../../../jobs/facebook.js');
const ProfileModel = require('../../model').getModel('profile');

class ProfileController {
  create(request, reply) {
    let profile = request.payload;
    ProfileModel
      .create(profile)
      .then((data) => {
	const fbj = new FacebookJob();
	const cron = data.cron || '0 0 0 * * *';
	const job  = schedule.scheduleJob(cron, function (){
	  fbj.runPostJob(data);
	});
	console.log("Job scheduled");
        reply(data).code(200);
      })
      .catch(e => reply(Boom.badRequest(e)));
  }
}


module.exports = ProfileController;
