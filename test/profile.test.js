const test = require('tape');
const server = require('../');

let createdProfile = {};

test('Should create a profile - POST /profile/create', (t) => {

  const expectedPayload = {
    name: "FB1",
    cron: "* * * * * *",
    type: "fbpost",
    token: "EAACEdEose0cBAJF6t6ARWZAjgzHZBmID3ZBcoEGUeHTvoILGJm55H682ZCMoSmM0TxhahK7COXn8pkPcjb0EEo71DJi52kakSc8ZCStXMcrgUQq9t73WvGgfuPZAb4AwFF11cocECjgVGoHfWOvfTGuiWaTKYSAG457kw24yjNmSvyZAnrTZAM4yYlPv3NqZCLl0ZD",
    page_id: "304752622977052",
  }

  const options = {
    method: 'POST',
    url: '/profile/create',
    payload: expectedPayload,
  };

  server.inject(options, (response) => {
    createdProfile = JSON.parse(response.payload);
    t.equal(response.statusCode, 200, 'Response code should be 200');
    t.equal(createdProfile.name, expectedPayload.name, 'Name matches');
    t.equal(createdProfile.cron, expectedPayload.cron, 'Cron matches');
    t.equal(createdProfile.page_id, expectedPayload.page_id, 'Page ID matches');
    t.equal(createdProfile.type, expectedPayload.type, 'Type matches');
    t.equal(createdProfile.token, expectedPayload.token, 'Token matches');
    server.stop(t.end);
  });
});


test('Should not create a profile if fields are missing (except cron) - POST /profile/create', (t) => {

  const payload = {
    name: "FB1",
    cron: "* * * * * *",
    page_id: "304752622977052",
  }

  const options = {
    method: 'POST',
    url: '/profile/create',
    payload: payload,
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 400, 'Response code should be 400');
    server.stop(t.end);
  });
});

test.onFinish(() => process.exit(0));
