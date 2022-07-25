const router = require("express").Router()
const {
  getAllVideos,
  getVideosById,
  createVideo,
  changeVotes,
  changeViews,
} = require("../controllers/videos.controller");
const checkValidVideo  = require("../middlewares/validationmiddleware");
router.get("/videos", getAllVideos)
router.get("/videos/:videoId", getVideosById)
router.post("/videos",checkValidVideo, createVideo);
router.patch("/videos/:videoId/votes", changeVotes);
router.patch("/videos/:videoId/views", changeViews);

module.exports = router