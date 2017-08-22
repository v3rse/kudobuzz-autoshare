const glob = require('glob');
const path = require('path');

const Handlers = {};

glob.sync('controllers/*.js', {
  cwd: __dirname,
}).forEach((file) => {
  const handlerPath = path.join(__dirname, file);
  Handlers[file.replace('controllers/', '').replace('.js', '')] = require(`${handlerPath}`);
});

function getHandler(handlerName) {
  return new Handlers[handlerName]();
}

module.exports = {
  getHandler,
};
