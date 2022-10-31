const { Schema, model } = require('mongoose');
const userSchema = require('./Assignment');

// Schema to create Student model
const studentSchema = new Schema(
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
    // figure out validation for emails
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
})

const User = model('student', userSchema);

module.exports = User;
