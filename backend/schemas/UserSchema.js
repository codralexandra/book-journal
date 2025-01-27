const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
    },
    myBooks: [
        {
          id: { type: String, required: true },
          title: { type: String, required: true },
          author: { type: String },
          cover: { type: String },
        },
      ],
});

const UserSchema = mongoose.model('UserSchema', userSchema);

module.exports = UserSchema;