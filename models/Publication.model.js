const { Schema, model } = require("mongoose");

const publicationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: {
      type: [String],
      enum: ["Me gusta", "No me gusta", "Me encanta"],
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

const Publication = model("Publication", publicationSchema);

module.exports = Publication;
