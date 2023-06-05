import axios from "axios";

const getsongidplay = (id) => {
    return axios.get(`http://localhost:8000/api/songsidplaylist/${id}`)
}

export default getsongidplay