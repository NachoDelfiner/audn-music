import axios from "axios";

const getArtistDetail = (name) => {
    return axios.get(`http://localhost:8000/api/artistname/${name}`)
}

export default getArtistDetail