const { Schema, model } = require('mongoose');
const userSchema = require('./Assignment');
const validator = require("validator");

// Schema to create Student model
const userSchema = new Schema(
  {
   username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
   },
   email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, "Valid email address required"],
   },
   thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }
   ],
   friends: [{
    type: Schema.Types.ObjectId,
    ref:"User",
   }]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
