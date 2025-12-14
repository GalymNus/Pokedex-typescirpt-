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

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location/${locationName}`;
        const location = await fetch(url);
        if (!location.ok) {
            throw new Error(`Failed to fetch locations: ${location.status}`);
        }
        const result = await location.json();
        PokeAPI.cache.add(url, result);
        return result;
    }
}

export type ShallowLocations = {
    count: number,
    next: string,
    previous: string,
    results: Location[],
};

export type Location = {
    id: number,
    name: string,
    region: string,
    names: string[],
    game_indices: string[],
    areas: string[]
};