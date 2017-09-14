var mongoose = require('mongoose');
var is = require('is_js');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 20,
    minlength: 3,
    index: true
  },
  password: {
    type: String
  },
  name: {
    type: String,
    maxlength: 80,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 250,
    validate: {
      validator: function(v) {
        return is.email(v);
      },
      message: 'The email field should be a valid email.'
    },
    index: true
  },
  createdAt: { type: Date, default: Date.now },
  postsRemoved: [Schema.Types.Mixed]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
