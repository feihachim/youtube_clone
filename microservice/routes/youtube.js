const axios = require("axios");
const router = require("express").Router();

const fetchOptions = (item, type = "feed") => {
  const paramsMap = new Map();

  paramsMap.set("feed", {
    q: item,
    part: "id,snippet",
    regionCode: "US",
    maxResults: "50",
  });
  paramsMap.set("channelDetails", { part: "snippet,statistics", id: item });
  paramsMap.set("channelVideos", {
    channelId: item,
    part: "snippet,id",
    order: "date",
    maxResults: "50",
  });
  paramsMap.set("videoDetails", {
    part: "contentDetails,snippet,statistics",
    id: item,
  });
  paramsMap.set("suggestedVideos", {
    relatedToVideoId: item,
    part: "id,snippet",
    type: "video",
    maxResults: "50",
  });

  return {
    params: paramsMap.get(type),
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
};

const fetchFromAPI = async (url, item, type = "feed") => {
  const urlTypeMap = new Map();
  urlTypeMap.set("channelDetails", "channels");
  urlTypeMap.set("videoDetails", "videos");
  urlTypeMap.set("channelVideos", "search");
  urlTypeMap.set("feed", "search");
  urlTypeMap.set("suggestedVideos", "search");
  const apiUrlType = urlTypeMap.get(type);
  const { data } = await axios.get(
    `${url}/${apiUrlType}`,
    fetchOptions(item, type)
  );
  return data;
};

router.get("/test", (req, res) => {
  res.json("test appel api route");
});

router.get("/", (req, res) => {
  const item = req.query.item;
  const type = req.query.type;
  fetchFromAPI(process.env.API_URL, item, type)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
