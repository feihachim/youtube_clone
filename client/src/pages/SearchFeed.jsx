import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Videos } from "../components";
import { useQuery } from "react-query";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["feeds"],
    queryFn: () => fetchFromAPI(searchTerm, "feed"),
  });

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for:{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span>
      </Typography>
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error: {error.message}</h1>}
      {data && <Videos videos={data.items} />}
    </Box>
  );
};

export default SearchFeed;
