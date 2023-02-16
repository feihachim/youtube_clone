import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { Box, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useQuery } from "react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "../components";

const VideoDetail = () => {
  const { id } = useParams();
  const {
    isLoading: isVideoDetailsLoading,
    error: videoDetailsError,
    data: videoDetailsData,
  } = useQuery({
    queryKey: ["videoDetails", id],
    queryFn: () => fetchFromAPI(id, "videoDetails"),
  });
  const {
    isLoading: isSuggestedVideosLoading,
    error: suggestedVideosError,
    data: suggestedVideosData,
  } = useQuery({
    queryKey: ["suggestedVideos", id],
    queryFn: () => fetchFromAPI(id, "suggestedVideos"),
  });

  {
    isVideoDetailsLoading && <h1>Loading...</h1>;
  }
  {
    videoDetailsError && <h1>Error: {videoDetailsError.message}</h1>;
  }

  {
    try {
      if (videoDetailsData) {
        const {
          snippet: { title, channelId, channelTitle },
          statistics: { viewCount, likeCount },
        } = videoDetailsData.items[0];
        return (
          <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
              <Box flex={1}>
                <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    className="react-player"
                    controls
                  />
                  <Typography color="#FFF" variant="h5" fontWeight="bold" p={2}>
                    {title}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ color: "#FFF" }}
                    py={1}
                    px={2}
                  >
                    <Link to={`/channel/${channelId}`}>
                      <Typography
                        variant={{ sm: "subtitle1", md: "h6" }}
                        color="#FFF"
                      >
                        {channelTitle}
                        <CheckCircleIcon
                          sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                        />
                      </Typography>
                    </Link>
                    <Stack direction="row" gap="20px" alignItems="center">
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        {parseInt(viewCount).toLocaleString()} views
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.7 }}>
                        {parseInt(likeCount).toLocaleString()} likes
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Box>
              <Box
                px={2}
                py={{ md: 1, xs: 5 }}
                justifyContent="center"
                alignItems="center"
              >
                {isSuggestedVideosLoading && (
                  <h2>Suggested videos loading...</h2>
                )}
                {suggestedVideosError && (
                  <h2>Error: {suggestedVideosError.message}</h2>
                )}
                {suggestedVideosData && (
                  <Videos
                    videos={suggestedVideosData.items}
                    direction="column"
                  />
                )}
              </Box>
            </Stack>
          </Box>
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

export default VideoDetail;
