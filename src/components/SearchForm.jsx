import { TextField, Button, Grid, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import ResultForm from "./ResultForm";
import { fetchData } from "../api";
import Header from "./Header";
import NoData from "./NoData";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const SearchForm = () => {
  const classes = useStyles();

  const [searchValues, setSearchValues] = useState({
    disease: "ALS",
    country: "United States",
    records: 10,
  });

  const [data, setData] = useState([]);

  const handleSubmit = async (disease, country, maxRecords) => {
    const apiData = await fetchData(disease, country, maxRecords);

    const {
      NStudiesFound,
      NStudiesReturned,
      FullStudies,
    } = apiData.FullStudiesResponse;

    setData(FullStudies);
  };

  const handleChange = (e) => {
    setSearchValues({ ...searchValues, [e.target.name]: e.target.value });
    setData([]);
  };

  const handleReset = () => {
    setData([]);
  };

  return (
    <>
      <Header></Header>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardContent style={{ display: "flex", justifyContent: "center" }}>
              <form autoComplete="off">
                <TextField
                  id="ConditionOrDisease"
                  label="Condition or Disease"
                  value={searchValues.disease}
                  name="disease"
                  onChange={handleChange}
                />
                <TextField
                  id="country"
                  label="Country"
                  value={searchValues.country}
                  name="country"
                  onChange={handleChange}
                />
                <TextField
                  id="NoOfTrails"
                  label="No Of Trails"
                  value={searchValues.records}
                  name="records"
                  onChange={handleChange}
                />
                <Button
                  className={classes.margin}
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    handleSubmit(
                      searchValues.disease,
                      searchValues.country,
                      searchValues.records
                    )
                  }
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
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {data ? <ResultForm data={data}></ResultForm> : <NoData />}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchForm;
