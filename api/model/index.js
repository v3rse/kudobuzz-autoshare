const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');
const Mockgoose = require('mockgoose').Mockgoose;

mongoose.Promise = global.Promise;
const dbUrl = process.env.MONGODB || 'mongodb://localhost:27017/kudobuzz-autoshare';

const Models = {};

glob.sync('collections/*.js', {
  cwd: __dirname,
}).forEach((file) => {
  const modelPath = path.join(__dirname, file);
  Models[file.replace('collections/', '').replace('.js', '')] = require(`${modelPath}`);
});

// test config
if (process.env.NODE_ENV === 'test') {
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  });
} else {
  mongoose.connect(dbUrl, { useMongoClient: true }, (mongooseErr) => {
      if (mongooseErr) {
	throw mongooseErr;
      }
  });
}


function getModel(modelName) {
    return Models[modelName];
}
  
module.exports = {
   getModel,
};
