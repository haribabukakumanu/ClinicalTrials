import React, { useState, useEffect } from "react";
import axios from "axios";

const ClinicalTrails = () => {
  const url = "expr=als&min_rnk=1&max_rnk=100";
  const [data, setData] = useState([]);

  const getData = async (url) => {
    axios
      .get(`https://ClinicalTrials.gov/api/query/full_studies?fmt=json&${url}`)
      .then((response) => {
        setData(response.data.FullStudiesResponse.FullStudies);
        console.log(response.data.FullStudiesResponse.FullStudies);
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  };
  useEffect(() => {
    getData(url);
  }, []);

  return <div></div>;
};

export default ClinicalTrails;
