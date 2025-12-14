import { State } from "src/state";

export async function commandExplore(state: State, args?: string[]) {
    const { pokeAPI } = state;
    console.log("args", args);
    if (args && args.length >= 1) {
        try {
            const pokemons = await pokeAPI.fetchLocation(args[0]);
            console.log(` Exploring : ${args}`);
            console.log(" Found Pokemon:");
            console.log("<>===============<>===============<>");

            for (const pokemon in pokemons) {
                console.log(`||> ${pokemons[pokemon].name}`);
            }
            console.log("<>================================<>");
        } catch (error) {
            throw new Error(`Failed to fetch locations: ${error}`);
        }
    } else {
        console.log("<>===============<>===============<>");
        console.log(` Please provide name of location to explore!`);
        console.log("<>===============<>===============<>");
    }
}
