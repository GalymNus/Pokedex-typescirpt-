export type CLICommand = {
    name: string,
    description: string,
    callback: (commnads: Record<string, CLICommand>) => void;
}