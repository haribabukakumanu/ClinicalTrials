import axios from "axios";

const countriesUrl = "https://covid19.mathdro.id/api";
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

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${countriesUrl}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
