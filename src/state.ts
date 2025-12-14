
import process from "node:process";
import { createInterface, type Interface } from "readline";
import { commandHelp } from "./commands/HelpCommand.js";
import { commandExit } from "./commands/ExitCommand.js";
import { commandMap } from "./commands/MapCommand.js";
import { commandMapB } from "./commands/MapBCommand.js";
import { PokeAPI } from "./PokeAPI.js";
import { Cache } from "./pokecache.js";

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => Promise<void>;
}

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
    pokeAPI: PokeAPI,
    prevLocation: string | null,
    nextLocation: string | null,
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: async (state) => await commandExit(state),
        },
        help: {
            name: "help",
            description: "Show help message",
            callback: async (state) => await commandHelp(state),
        },
        map: {
            name: "map",
            description: "Show nearest/next areas",
            callback: async (state) => await commandMap(state),
        },
        mapb: {
            name: "mapb",
            description: "Show previous nearest areas",
            callback: async (state) => await commandMapB(state),
        },
        location: {
            name: "location",
            description: "Show help message",
            callback: async (state) => await commandHelp(state),
        }
    }
}

export function initState() {
    const input_stream = process.stdin;
    const output_stream = process.stdout;
    const cache = new Cache(500);
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >",
    });


    return {
        commands: getCommands(),
        readline: rl,
        pokeAPI: new PokeAPI(cache),
        prevLocation: null,
        nextLocation: null,
    }
}