const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    birthDate: {
      type: Date,
    },

    email: {
      type: String,
      trim: true,
    },

    phoneNum: {
      type: Number,
      minLength: 9,
    },

    profileImg: {
      type: String,
      trim: true,
    },

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    rol: 
      {
        type: [String],
        enum: ["user", "admin"],
        default: "user",
      },
    
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
