import axios from "axios";

const API_URL = "https://covid19.mathdro.id/api";

const countriesApi = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}/countries`);
    return response;
  },
};

export default countriesApi;
