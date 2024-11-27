import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "./pokemon.type";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
    endpoints: (build) => ({
        getPokemonByName: build.query<Pokemon, string>({
            query: (name) => `pokemon/${name}`
        })
    })
});

export const { useGetPokemonByNameQuery } = api;
