const { Schema, model } = require("mongoose");

const groupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true
    },
    
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mods: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    publicationsList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Publications",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = model("Group", groupSchema);

module.exports = Group;