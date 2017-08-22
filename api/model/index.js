const mongoose = require('mongoose');
const glob = require('glob');
const path = require('path');

mongoose.Promise = global.Promise;
const dbUrl = process.env.MONGODB || 'mongodb://localhost:27017/kudobuzz-autoshare';

const Models = {};

glob.sync('collections/*.js', {
  cwd: __dirname,
}).forEach((file) => {
  const modelPath = path.join(__dirname, file);
  Models[file.replace('collections/', '').replace('.js', '')] = require(`${modelPath}`);
});



mongoose.connect(dbUrl,{ useMongoClient: true }, (mongooseErr) => {
    if (mongooseErr) {
      throw mongooseErr;
    }
});


function getModel(modelName) {
    return Models[modelName];
}
  
module.exports = {
   getModel,
};
