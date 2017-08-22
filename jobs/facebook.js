const graph = require('fbgraph');
const MessageModel = require('../api/model').getModel('message');

class FacebookJob {
  runPostJob(profile) {
    // get message by profile and 'sent' status
    MessageModel.getBySendStatusAndProfile(profile._id)
      .then((data) => {
        if(data[0]){
          const message = data[0];
          // setup social media api call
          graph.setAccessToken(profile.token);

          // send message
          const post = {
            message: message.content,
          };


          graph.post(`${profile.page_id}/feed`, post, function(err, res) {
            if(err) {
              console.log(err);
	    }
            else {
              // returns the post id
              // set 'sent' value to true
              MessageModel.edit(message._id, {sent: true})
              .catch(() => {
                console.log("Failed to edit message");
              });
              console.log(res); 
	    }
          });
        }else {
          console.log("No messages found");
        }
      }).catch((e) => {
        console.log("Failed to forward message", e);
      });

  }
}

module.exports = FacebookJob;
