
import process from "node:process";
import { createInterface, type Interface } from "readline";
import { commandHelp } from "./commands/HelpCommand.js";
import { commandExit } from "./commands/ExitCommand.js";

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => void;
}

export type State = {
    commands: Record<string, CLICommand>,
    readline: Interface,
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Show help message",
            callback: commandHelp,
        }
    }
}

export function initState() {
    const input_stream = process.stdin;
    const output_stream = process.stdout;
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >",
    });
    return {
        commands: getCommands(),
        readline: rl
    }
}