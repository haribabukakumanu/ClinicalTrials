import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCountries, fetchCountries } from "../redux/countries";
import ResultForm from "./ResultForm";
import { fetchData } from "../api";
import Header from "./Header";
import NoData from "./NoData";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SearchForm = () => {
  const classes = useStyles();

  const countries = useSelector(selectAllCountries);

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

  const dispatch = useDispatch();
  const countriesCallback = useCallback(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    countriesCallback();
  }, [countriesCallback]);

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
                <FormControl className={classes.formControl}>
                  <TextField
                    id="ConditionOrDisease"
                    label="Condition or Disease"
                    value={searchValues.disease}
                    name="disease"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country"
                    value={searchValues.country}
                    name="country"
                    onChange={handleChange}
                  >
                    <MenuItem value="United States">United States</MenuItem>
                    {countries.map((country, i) => (
                      <MenuItem key={i} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="trails-label">Number Of Trails</InputLabel>
                  <Select
                    labelId="trails-label"
                    id="records"
                    value={searchValues.records}
                    name="records"
                    onChange={handleChange}
                  >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="75">75</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                  </Select>
                </FormControl>

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
