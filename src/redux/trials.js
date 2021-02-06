import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import trialsApi from "../api/trials";

export const fetchTrials = createAsyncThunk(
  "trials/fetchAll",
  async (disease, country, maxRecords) => {
    const response = await trialsApi.fetchAll(disease, country, maxRecords);
    return response.data;
  }
);

export const trialsAdapter = createEntityAdapter();

const initialState = trialsAdapter.getInitialState({ loading: false });

export const slice = createSlice({
  name: "trials",
  initialState,
  reducers: {
    removeUser: trialsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrials.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTrials.fulfilled, (state, action) => {
      trialsAdapter.upsertMany(state, action.payload);
      state.loading = false;
    });
  },
});

const reducer = slice.reducer;
export default reducer;

export const { removeUser } = slice.actions;

export const {
  selectById: selectTrialsById,
  selectIds: selectTrialsIds,
  selectEntities: selectTrialsEntities,
  selectAll: selectAllTrials,
  selectTotal: selectTotalTrials,
} = trialsAdapter.getSelectors((state) => state.trials);
