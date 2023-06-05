import axios from "axios";

const getMusic = (id) => {
    return axios.get(`http://localhost:8000/api/songid/${id}`)
}

export default getMusic