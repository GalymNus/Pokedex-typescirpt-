import { State } from "src/state";

export async function commandMapB(state: State) {
    const { pokeAPI } = state;
    try {
        const locations = await pokeAPI.fetchLocations(state.prevLocation || undefined);
        state.nextLocation = locations.next;
        state.prevLocation = locations.previous;
        console.log(" Map:");
        console.log("<>===============<>===============<>");

        for (const location in locations.results) {
            console.log(`||> ${locations.results[location].name}`);
        }
        console.log("<>================================<>");

    } catch (error) {
        throw new Error(`Failed to fetch locations: ${error}`);
    }
}
