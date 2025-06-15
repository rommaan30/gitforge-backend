const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RepositorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  content: [
    {
      type: String,
    },
  ],
  visibility: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isuues: {
    type: Schema.Types.ObjectId,
    ref: "Issue",
  },
});

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;
