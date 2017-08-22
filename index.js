const chroma = require('@v3rse/chroma');
const server = require('./api');


// Start the server
server.start((serverStartErr) => {
  if (serverStartErr) {
    throw serverStartErr;
  }
  console.log(chroma.underline.lgreen(`Server started at ${chroma.lyellow(server.info.uri)}`));
});
