const { Schema, model } = require("mongoose");

const groupCommentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    loves: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const GroupComment = model("GroupComment", groupCommentSchema);

module.exports = GroupComment;
