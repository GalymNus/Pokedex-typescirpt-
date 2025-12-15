import { State } from "src/state";

export async function commandCatch(state: State, args?: string[]) {
    const { pokeAPI } = state;
    if (args && args.length >= 1) {
        try {
            const pokemon = await pokeAPI.fetchPokemonStats(args[0]);
            const catchChance = Math.floor(Math.random() * 501);
            const name = args[0];
            console.log("<>===============<>===============<>");
            if (pokemon == -1) {
                console.log(` Please provide correct pokemon name to catch!`);
            } else {
                console.log(` Throwing a Pokeball at ${name}...`)
                if (pokemon.base_experience < catchChance) {
                    console.log(` Success! You have caught ${name}!`);
                    state.userPokedex[name] = pokemon;
                } else {
                    console.log(` Fail! The ${name} ran away!`);
                }
            }
            console.log("<>================================<>");
        }
        catch (error) {
            throw new Error(`Failed to fetch locations: ${error}`);
        }
    }
    else {
        console.log("<>===============<>===============<>");
        console.log(` Please provide pokemons name to catch!`);
        console.log("<>===============<>===============<>");
    }
}
