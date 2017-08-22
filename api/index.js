const Hapi = require('hapi');
const glob = require('glob');
const path = require('path');
const pack = require('../package');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const PORT = process.env.PORT || 3000;

const server = new Hapi.Server();

// The connection object takes some
// configuration, including the port
server.connection({
  port: PORT,
  routes: {
    cors: {
      origin: ['*'],
      headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
    },
  },
});

const options = {
  info: {
    title: 'Kudobuzz Autoshare API Documentation',
    version: pack.version,
  },
};

// setup routes as hapi plugins
const plugins = [];

// add other plugins
plugins.push(
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: options,
  });

glob.sync('routes/*.js', {
  cwd: __dirname,
}).forEach((file) => {
  const routePluginPath = path.join(__dirname, file);
  plugins.push(require(`${routePluginPath}`));
});

// Load plugins and start server
server.register(plugins, (err) => {
  if (err) {
    throw err;
  }
});

module.exports = server;
