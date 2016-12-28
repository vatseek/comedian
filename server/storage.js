const mongoose = require('mongoose');
import config from 'config'

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));
mongoose.Promise = global.Promise;

export const mongoDb = mongoose;
