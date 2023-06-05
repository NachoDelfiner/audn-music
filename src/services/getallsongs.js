import axios from "axios";

const getallSongs = () => {
    return axios.get('http://localhost:8000/api/songs')
}

export default getallSongs