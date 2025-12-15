import { Cache } from "./pokecache";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private static cache: Cache;

    constructor(cache: Cache) {
        PokeAPI.cache = cache;
    }
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
        const chachedItem: ShallowLocations | undefined = PokeAPI.cache.get(url);
        if (chachedItem) {
            return chachedItem;
        } else {
            const locations = await fetch(url);
            if (!locations.ok) {
                throw new Error(`Failed to fetch locations: ${locations.status}`);
            }
            const results = await locations.json();
            PokeAPI.cache.add(url, results);
            return await results;
        }
    }

    async fetchLocation(locationName: string): Promise<Pokemon[]> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const chachedItem: Pokemon[] | undefined = PokeAPI.cache.get(url);
        if (chachedItem) {
            return chachedItem;
        } else {
            const location = await fetch(url);
            if (!location.ok) {
                throw new Error(`Failed to fetch locations: ${location.status}`);
            }
            const result = await location.json();
            const pokemons = result.pokemon_encounters.map((item: PokemonObj) => item.pokemon);
            PokeAPI.cache.add(url, pokemons);
            return pokemons;
        }
    }

    async fetchPokemonStats(pokemonName: string): Promise<Pokemon | -1> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
        const chachedItem: Pokemon | undefined = PokeAPI.cache.get(url);
        if (chachedItem) {
            return chachedItem;
        } else {
            const request = await fetch(url);
            if (!request.ok) {
                if (request.status == 404) {
                    return -1;
                }
                throw new Error(`Failed to fetch pokemon stats: ${request.status}`);
            }
            const result = await request.json();
            const { name, height, weight, base_experience, stats, types } = result;
            const pokemonStats = {
                name, height, weight, base_experience, stats, types
            }
            PokeAPI.cache.add(url, pokemonStats);
            return pokemonStats;
        }
    }



}

export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: Location[],
};

export type Location = {
    name: string,
}

export type PokemonObj = {
    pokemon: Pokemon
};

export type Pokemon = {
    name: string;
    weight: number;
    height: number;
    base_experience: number;
    stats: PokemonStat[];
    types: PokemonType[];
};

export type PokemonStat = {
    base_stat: number,
    efford: number,
    stat: {
        name: string, url: string
    }
}

export type PokemonType = {
    slot: number,
    type: { name: string },
    url: string
}