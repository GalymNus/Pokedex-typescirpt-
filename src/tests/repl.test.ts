import { cleanInput } from "../repl";
import { describe, expect, test } from "vitest";

cleanInput

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "Charmander Bulbasaur PIKACHU",
        expected: ["charmander", "bulbasaur", "pikachu"],
    }, {
        input: "12 house flat",
        expected: ["12", "house", "flat"],
    }, {
        input: "OneVeryLongStringWithoutSpaces",
        expected: ["oneverylongstringwithoutspaces"],
    },
    {
        input: "",
        expected: [],
    }
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
        console.log("actual", actual);
        console.log("expected", expected);
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});