import { createSlice } from "@reduxjs/toolkit";
import { pokemonApi } from "./store";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.getAllPokemon.matchFulfilled,
      (state, { payload }) => payload
    );
  },
});

export default pokemonSlice.reducer;
