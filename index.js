const chroma = require('@v3rse/chroma');
const schedule = require('node-schedule');

const server = require('./api');
const FacebookJob = require('./jobs/facebook.js');
const ProfileModel = require('./api/model').getModel('profile');

// Setup jobs
// fetch all profiles
// schedule crons for specific service
ProfileModel.getAll()
  .then((data) => {
    data.forEach((profile) => {
      // default daily run
      const fbj = new FacebookJob();
      const cron = profile.cron || '0 0 0 * * *';
      const job  = schedule.scheduleJob(cron, function (){
        fbj.runPostJob(profile);
      });
    });
  })


// Start the server
server.start((serverStartErr) => {
  if (serverStartErr) {
    throw serverStartErr;
  }
  console.log(chroma.underline.lgreen(`Server started at ${chroma.lyellow(server.info.uri)}`));
});
