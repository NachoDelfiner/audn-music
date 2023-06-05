import axios from "axios";

const getArtist = () => {
    return axios.get('http://localhost:8000/api/artists')
}

export default getArtist