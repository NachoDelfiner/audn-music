import axios from "axios";

const getSongsbyArtistId = (id) => {
  return axios.get(`http://localhost:8000/api/cancionporartista/${id}`);
};

export default getSongsbyArtistId;
