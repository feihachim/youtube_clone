import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Sidebar, Videos } from "../components";
import { useQuery } from "react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["feeds", selectedCategory],
    queryFn: () => fetchFromAPI(selectedCategory, "feed"),
  });

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 Feihachim Media
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>Error: {error.message}</h1>}
        {data && <Videos videos={data.items} />}
      </Box>
    </Stack>
  );
};

export default Feed;
