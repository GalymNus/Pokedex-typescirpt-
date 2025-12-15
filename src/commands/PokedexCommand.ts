import { State } from "src/state";

export async function commandPokedex(state: State) {
    const { userPokedex } = state;
    if (Object.keys(userPokedex).length > 0) {
        console.log("<>===============<>===============<>");
        console.log(" Displaying pokedex :");
        Object.keys(userPokedex).forEach(element => {
            console.log(`   -${element}`);
        });
    } else {
        console.log(" You have not caught any pokemons");

    }
    console.log("<>================================<>");
}
