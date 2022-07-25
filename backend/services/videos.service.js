const Video = require("../models/video.model");

class VideoService {
  findAll = async () => {
    return await Video.find();
  };
  findById = async (videoId) => {
    return await Video.findById(videoId);
  };
  findByTitle = async (title) => {
    let videos = await this.findAll();
    videos = videos.filter((val) => {
      let string = val.title.toLowerCase();
      return string.includes(title.toLowerCase());
    });
    return videos;
  };
  findByGenres = async (genres) => {
    if (genres.includes(",")) genres = genres.split(",");
    else genres = [genres];
    genres = genres.map((val) => val[0].toUpperCase() + val.substr(1));
    let videos = await Video.find({
      genre: { $in: genres },
    });
    if (videos.length > 0) return videos;
    else throw new Error("enter valid genres");
  };
  findByContentRating = async (ratings) => {
    let contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];

    if (contentRatings.includes(ratings)) {
      let requiredRatings = contentRatings.slice(
        0,
        contentRatings.indexOf(ratings) + 1
      );
      // console.log(requiredRatings);
      return await Video.find({
        // contentRating: { $in: requiredRatings },
        contentRating:ratings
      });
    } else {
      throw new Error("enter valid ratings");
    }
  };
  findBySort = async (criteria) => {
    let videos = await Video.find({});
    if (criteria == "viewCount") {
      // console.log("if");
      videos = videos.sort((a, b) => a.viewCount - b.viewCount);
      return videos;
    } else {
      videos = videos.sort((a, b) => b.releaseDate - a.releaseDate);
      return videos;
    }
  };
  findByMultiple = async (filters) => {
    let genres = [];
    let resFilter = [];
    let requiredRatings = [];
    let keys = Object.keys(filters);
      if(keys.length<=1) { 
      console.log("else", filters);
      
      if (filters.title) return await this.findByTitle(filters.title);
      if (filters.genres)
      return await this.findByGenres(filters.genres);
      
      if (filters.contentRating)
      return await this.findByContentRating(filters.contentRating);
      
      if (filters.sortBy)
      return await this.findBySort(filters.sortBy);
        // if (filters == {})
          return await this.findAll();
    }
    for (let i = 0; i < keys.length; i++) {
      let obj = keys[i];
      // console.log(`{"${obj}":"${filters[obj]}"}`)
      if (obj === "title") {
        resFilter.push(
          JSON.parse(
            `{"title": { "$regex": "${filters[obj]}", "$options": "i" }}`
          )
        );
        continue;
      }
      if (obj === "genres") {
        if (filters[obj].includes(",")) genres = filters[obj].split(",");
        else genres = [filters[obj]];
        // genres = genres.map((val) => JSON.parse(`{ "genre": "${val[0].toUpperCase() + val.substr(1)}" }`));
        genres = genres.map((val) => val[0].toUpperCase() + val.substr(1));
      } else if (obj === "contentRating") {
        // console.log(filters[obj]);
        // requiredRatings = contentRatings.slice(
        //   0,
        //   contentRatings.indexOf(filters[obj]) + 1
        // );
        requiredRatings = [filters[obj]]
      } else resFilter.push(JSON.parse(`{"${obj}":"${filters[obj]}"}`));
    }
    // if (resFilter.length > 1) {
    console.log(resFilter, requiredRatings, genres);
    let result = []
  
    result = await Video.find({
        $and: [
          ...resFilter,
          { genre: { $in: genres } },
          { contentRating: { $in: requiredRatings } },
        ],
       
      });
  
    return result
  };

  createNewVideo = async (video) => {
    const vid = new Video(video);
    const savedVideo = await vid.save();
    return savedVideo;
  };
  updateVotes = async (videoId, updates) => {
    let currVideo = await this.findById(videoId);
    // console.log(updates, videoId, currVideo);

    if (updates.change == "increase") currVideo.votes[updates.vote + "s"] += 1;
    else currVideo.votes[updates.vote + "s"] -= 1;

    return await Video.findOneAndUpdate({ _id: videoId }, currVideo, {
      new: true,
    });
  };
  updateViews = async (videoId) => {
    let currVideo = await this.findById(videoId);
    currVideo.viewCount += 1;
    return await Video.findOneAndUpdate({ _id: videoId }, currVideo, {
      new: true,
    });
  };
}

module.exports = VideoService;
