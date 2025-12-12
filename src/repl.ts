import process from "node:process";
import { createInterface } from "node:readline";
import { commandHelp } from "./commands/HelpCommand.js";
import { commandExit } from "./commands/ExitCommand.js";
import { CLICommand } from "./command.js";

const commands: Record<string, CLICommand> = getCommands();

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

export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter((item) => item.length > 0).map(item => item.toLocaleLowerCase());
}

export function startREPL() {
    const input_stream = process.stdin;
    const output_stream = process.stdout;
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex >",
    });
    rl.prompt();
    rl.on("line", (line: string) => {

        const splitLines = cleanInput(line);
        if (splitLines.length == 0) {
            rl.prompt();
        } else {
            if (commands[splitLines[0]]) {
                commands[splitLines[0]].callback(commands);
            } else {
                console.log("Unknown command");
            }
            rl.prompt()
        }
    });
}