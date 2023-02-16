import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "../components";
import { useQuery } from "react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const {
    isLoading: channelInfosLoading,
    error: channelInfosError,
    data: channelInfosData,
  } = useQuery({
    queryKey: ["channelDetails", id],
    queryFn: () => fetchFromAPI(id, "channelDetails"),
  });
  const {
    isLoading: channelVideosLoading,
    error: channelVideosError,
    data: channelVideosData,
  } = useQuery({
    queryKey: ["channelVideos", id],
    queryFn: () => fetchFromAPI(id, "channelVideos"),
  });

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%,rgba(0,212,255,1) 100%",
            zIndex: 10,
            height: "300px",
          }}
        />
        {channelInfosLoading && <h1>Channel Infos loading...</h1>}
        {channelInfosError && <h1>Error: {channelInfosError.message}</h1>}
        {channelInfosData && (
          <ChannelCard
            channelDetail={channelInfosData?.items[0]}
            marginTop="-110px"
          />
        )}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        {channelVideosLoading && <h2>Channel videos loading...</h2>}
        {channelVideosError && <h2>Error: {channelVideosError.message}</h2>}
        {channelVideosData && <Videos videos={channelVideosData?.items} />}
      </Box>
    </Box>
  );
};

export default ChannelDetail;
