import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import countriesApi from "../api/countries";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async () => {
    const response = await countriesApi.fetchAll();
    const { countries } = response.data;
    return countries.map((country) => country.name);
  }
);

export const countriesAdapter = createEntityAdapter();

const initialState = countriesAdapter.getInitialState({ loading: false });

export const slice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    removeUser: countriesAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      countriesAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
  },
});

const reducer = slice.reducer;
export default reducer;

export const { removeUser } = slice.actions;

export const {
  selectById: selectCountriesById,
  selectIds: selectCountriesIds,
  selectEntities: selectCountriesEntities,
  selectAll: selectAllCountries,
  selectTotal: selectTotalCountries,
} = countriesAdapter.getSelectors((state) => state.countries);
