import { CLICommand, State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter((item) => item.length > 0).map(item => item.toLocaleLowerCase());
}

export function startREPL(state: State) {
    const { readline: rl, commands } = state;
    rl.on("line", (line: string) => {
        const splitLines = cleanInput(line);
        if (splitLines.length == 0) {
            rl.prompt();
        } else {
            if (commands[splitLines[0]]) {
                commands[splitLines[0]].callback(state);
            } else {
                console.log("Unknown command");
            }
            rl.prompt()
        }
    });
}