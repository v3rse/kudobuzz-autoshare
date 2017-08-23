const test = require('tape');
const server = require('../');

let createdProfile = {};

test('Should create a message - POST /message/schedule', (t) => {

  const payload = {
    profile: "599c5d5ca5926646c6ca011a",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }

  const options = {
    method: 'POST',
    url: '/message/schedule',
    payload: payload,
  };

  server.inject(options, (response) => {
    createdMessage = JSON.parse(response.payload);
    t.equal(response.statusCode, 200, 'Response code should be 200');
    t.equal(createdMessage.profile, payload.profile, 'Profile matches');
    t.equal(createdMessage.content, payload.content, 'Content matches');
    server.stop(t.end);
  });
});


test('Should not create a message if field is missing - POST /message/schedule', (t) => {

  const payload = {
    profile: "599c5d5ca5926646c6ca011a",
  }

  const options = {
    method: 'POST',
    url: '/message/schedule',
    payload: payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 400, 'Response code should be 400');
    server.stop(t.end);
  });
});

test.onFinish(() => process.exit(0));
