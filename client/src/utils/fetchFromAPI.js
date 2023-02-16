import axios from "axios";

const BASE_URL = "http://localhost:5000/api/youtube";

const fetchFromAPI = async (item, type) => {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { item: item, type: type },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export { fetchFromAPI };
