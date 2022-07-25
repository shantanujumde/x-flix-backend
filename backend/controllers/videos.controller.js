const VideoService = require("../services/videos.service");
const VideoServiceInstance = new VideoService();
const getAllVideos = async (req, res) => {
  try {
    const videosRes = await VideoServiceInstance.findByMultiple(req.query);
    console.log(videosRes.length);

    return res.status(200).json({ videos: videosRes });
    // if (req.query.title) {
    //   const videos = await VideoServiceInstance.findByTitle(req.query.title);
    //   return res.status(200).json(videos);
    // }
    // if (req.query.genres) {
    //   const videos = await VideoServiceInstance.findByGenres(req.query.genres);
    //   return res.status(200).json(videos);
    // }
    // if (req.query.contentRating) {
    //   const videos = await VideoServiceInstance.findByContentRating(
    //     req.query.contentRating
    //   );
    //   return res.status(200).json(videos);
    // }
    // if (req.query.sortBy) {
    //   validSort = ["releaseDate", "viewCount"];
    //   if (validSort.includes(req.query.sortBy)) {
    //     console.log(req.query.sortBy);
    //     const videos = await VideoServiceInstance.findBySort(req.query.sortBy);
    //     return res.status(200).json(videos);
    //   } else {
    //     throw new Error("Enter valid sort");
    //   }
    // }
    // const videos = await VideoServiceInstance.findAll();
    // return res.status(200).json(videos);
  } catch (e) {
    res.status(404).json({ message: `Could Not Fetch Videos from DB- ${e}` });
  }
};
const getVideosById = async (req, res) => {
  try {
    const videos = await VideoServiceInstance.findById(req.params.videoId);
    if (videos.length === 0) {
      return res.status(404).json({ message: "Please enter correct Id" });
    }
    return res.status(200).json(videos);
  } catch (e) {
    res.status(404).json({ message: "Could Not Fetch Videos from DB", e });
  }
};

const createVideo = async (req, res) => {
  try {
      const videos = await VideoServiceInstance.createNewVideo(req.body);
     
      return res.status(201).json(videos);
    } catch (e) {
      res.status(400).json({ message: "Could Not Create Video", e });
    }
}
const changeVotes = async (req, res) => {
  try {
     const videoId = req.params.videoId
     const videos = await VideoServiceInstance.updateVotes(videoId,req.body);
     return res.status(204).json(videos);
   } catch (e) {
     res.status(400).json({ message: "Could Not Update Video", e });
   }
};
const changeViews = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const videos = await VideoServiceInstance.updateViews(videoId, req.body);
      // console.log(videos)
      return res.status(204).json(videos);
    } catch (e) {
      res.status(400).json({ message: "Could Not Update Video", e });
    }
}
module.exports = {
  getAllVideos,
  getVideosById,
  createVideo,
  changeVotes,
  changeViews,
};
