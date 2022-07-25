const Joi = require("joi");

const votesSchema = Joi.object().keys({
 upVotes: Joi.number().default(0), downVotes: Joi.number().default(0)
})
const videoSchema = Joi.object().keys({
  videoLink: Joi.string().required(),
  title: Joi.string().max(50).required(),
  genre: Joi.string().required(),
  contentRating: Joi.string().required(),
  releaseDate: Joi.date().required(),
  previewImage: Joi.string().uri().required(),
  votes:votesSchema ,
  viewCount: Joi.number().default(0),
});

const checkValidVideo = (req, resp, next) => {
  const {
    videoLink,
    title,
    genre,
    contentRating,
    releaseDate,
    previewImage,
    viewCount,
  } = req.body;
  const { error } = videoSchema.validate({
    videoLink,
    title,
    genre,
    contentRating,
    releaseDate,
    previewImage,
    viewCount,
  });
  if (error) {
    return resp.status(422).json(error);
  }
  // console.log(
  //   videoLink,
  //   title,
  //   genre,
  //   contentRating,
  //   releaseDate,
  //   previewImage,
  //   viewCount
  // );
  next();
};

module.exports = checkValidVideo;
