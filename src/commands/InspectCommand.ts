import { State } from "src/state";
import { PokemonStat, PokemonType } from "../PokeAPI";

export async function commandInspect(state: State, args?: string[]) {
    const { pokeAPI } = state;
    if (args && args.length >= 1) {
        const name = args[0];
        console.log("<>===============<>===============<>");
        if (state.userPokedex[name]) {
            console.log(" Inspecting :");
            const pokemon = state.userPokedex[name];
            for (const key of Object.keys(pokemon)) {
                if (key != "stats" && key != "types") {
                    console.log(` ${key}: ${pokemon[key as keyof typeof pokemon]}`);
                } else if (key == "stats") {
                    console.log("Stats:")
                    pokemon[key].map(item => {
                        console.log(`   ${item.stat.name}: ${item.base_stat}`);
                    });
                } else {
                    console.log("Types:")
                    pokemon[key].map(item => {
                        console.log(`   ${item.slot}: ${item.type.name}`);
                    });
                }
            }

        } else {
            console.log(" You have not caught that pokemon");

        }
        console.log("<>================================<>");
    } else {
        console.log("<>===============<>===============<>");
        console.log(` Please provide pokemon name to inspect!`);
        console.log("<>===============<>===============<>");
    }
}
