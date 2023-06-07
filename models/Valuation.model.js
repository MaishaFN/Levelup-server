const { Schema, model } = require("mongoose");

const valuationSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gameId: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      max: 5,
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

const Valuation = model("Valuation", valuationSchema);

module.exports = Valuation;
