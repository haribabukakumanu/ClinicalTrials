import axios from "axios";

const API_URL =
  "https://ClinicalTrials.gov/api/query/full_studies?fmt=json&min_rnk=1";

const trialsApi = {
  async fetchAll(disease, country, maxRecords) {
    const response = await axios.get(
      `${API_URL}&expr=${disease} AND SEARCH[Location](AREA[LocationCountry] ${country})&max_rnk=${maxRecords}`
    );
    return response;
  },
};

export default trialsApi;
