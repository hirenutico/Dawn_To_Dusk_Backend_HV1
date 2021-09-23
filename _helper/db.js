const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
module.exports = {   
    User : require('../src/Auth/AuthModel.ts'),
    Menu : require('../src/Menus/MenuModels.ts'),
}