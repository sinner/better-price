var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
  postsRemoved: [Schema.Types.Mixed]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
