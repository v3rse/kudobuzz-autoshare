const Boom = require('boom');
const MessageModel = require('../../model').getModel('message');

class MessageController {
  schedule(request, reply) {
    let message = request.payload;
    message.sent = false;
    MessageModel
      .create(message)
      .then((data) => {
        reply(data).code(200);
      })
      .catch(e => reply(Boom.badRequest(e)));
  }
}


module.exports = MessageController;
