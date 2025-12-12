export function cleanInput(input: string): string[] {
    return input.trim().split(" ").filter((item) => item.length > 0).map(item => item.toLocaleLowerCase());
}