import axios from "axios";

//const url = "https://covid19.mathdro.id/api";
const url = `https://ClinicalTrials.gov/api/query/full_studies?fmt=json&min_rnk=1`;

export const fetchData = async (disease, country, maxRecords) => {
  let changeableUrl = url;

  if (disease) {
    changeableUrl = `${url}&expr=${disease} AND SEARCH[Location](AREA[LocationCountry] ${country})&max_rnk=${maxRecords}`;
  }

  try {
    const {
      data: { FullStudiesResponse },
    } = await axios.get(changeableUrl);

    return { FullStudiesResponse };
  } catch (error) {
    return error;
  }
};
