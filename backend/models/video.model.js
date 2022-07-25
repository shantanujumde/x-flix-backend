const mongoose = require("mongoose");
const validator = require("validator");
const voteSchema = new mongoose.Schema({
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
});
const videoSchema = new mongoose.Schema({
  videoLink: { type: String, validate: (value) => validator.isURL(value) },
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  genre: String,
  contentRating: String,
  releaseDate: Date,
  previewImage: { type: String, validate: (value) => validator.isURL(value) },
  votes: {
    type: voteSchema,
    default: {
      upVotes:0,
      downVotes:0,
    },
  },
  viewCount: { type: Number, default: 0 },
});

const videoModel = mongoose.model("Videos", videoSchema);
module.exports = videoModel;
