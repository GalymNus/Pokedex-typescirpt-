import { State } from "src/state";

export function commandHelp(state: State) {
    const { commands } = state;
    console.log("Welcome to the Pokedex!");
    console.log("<>===============<>===============<>");
    console.log("|| Usage:");
    for (const command in state.commands) {
        console.log(`||> ${commands[command].name}: ${commands[command].description}`);
    }
    console.log("<>================================<>");
}
