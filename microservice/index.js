const express = require("express");
require("dotenv").config();
const cors = require("cors");
const youtubeRoute = require("./routes/youtube");

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = {
  origin: "https://feihachim-media.netlify.app",
  methods: "GET",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Hello from youtube_clone microservice");
});

app.use("/api/youtube", youtubeRoute);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
