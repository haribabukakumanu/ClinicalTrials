import { TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import axios from "axios";
import ResultForm from "./ResultForm";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SearchForm = () => {
  const classes = useStyles();

  const [disease, setDisease] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = (disease) => {
    const url = `https://ClinicalTrials.gov/api/query/full_studies?fmt=json&expr=${disease}&min_rnk=1&max_rnk=100`;
    axios
      .get(url)
      .then((response) => {
        setData(response.data.FullStudiesResponse.FullStudies);
        //console.log(response.data.FullStudiesResponse.FullStudies);
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      );
  };

  const handleChange = (e) => {
    setDisease(e.target.value);
    setData([]);
  };

  const handleReset = () => {
    setDisease("");
    setData([]);
  };

  return (
    <>
      <form autoComplete="off">
        <Box textAlign="center" m={2}>
          <TextField
            id="ConditionOrDisease"
            label="Condition or Disease"
            value={disease}
            onChange={handleChange}
          />
          <Button
            className={classes.margin}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleSubmit(disease)}
          >
            Search
          </Button>
          <Button
            className={classes.margin}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        </Box>
        <ResultForm data={data}></ResultForm>
      </form>
    </>
  );
};

export default SearchForm;
