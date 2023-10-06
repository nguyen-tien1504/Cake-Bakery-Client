import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import pokemonSlice from "./pokemonSlice";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getAllPokemon: builder.query({ query: () => ({ url: "pokemon" }) }),
    getNextPokemon: builder.query({
      // query: (url) => {
      //   return url;
      // },

      queryFn: async (arg, api, extraOptions, baseQuery) => {
        try {
          const result = await baseQuery(arg);
          return result
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }).concat(
      pokemonApi.middleware
    ),
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    cart: cartSlice,
    user: userSlice,
    // pokemon: pokemonSlice,
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetAllPokemonQuery, useGetNextPokemonQuery } =
  pokemonApi;
