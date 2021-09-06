import {createToken, Lexer} from "chevrotain";

export const Identifier = createToken({name: "Identifier", pattern: /[a-zA-Z]\w*/});
// We specify the "longer_alt" property to resolve keywords vs identifiers ambiguity.
// See: https://github.com/chevrotain/chevrotain/blob/master/examples/lexer/keywords_vs_identifiers/keywords_vs_identifiers.js
export const Select = createToken({
    name: "Select",
    pattern: /select/i,
    longer_alt: Identifier,
});
export const From = createToken({
    name: "From",
    pattern: /from/i,
    longer_alt: Identifier,
});
export const Where = createToken({
    name: "Where",
    pattern: /where/i,
    longer_alt: Identifier,
});
export const STAR = createToken({name: "Star", pattern: /\*/});
export const Comma = createToken({name: "Comma", pattern: /,/});
export const Integer = createToken({name: "Integer", pattern: /0|[1-9]\d*/});
export const GreaterThan = createToken({name: "GreaterThan", pattern: />/});
export const LessThan = createToken({name: "LessThan", pattern: /</});
export const Equal = createToken({name: "Equal", pattern: /=/});
export const Semicolon = createToken({name: "Semicolon", pattern: /;/});
export const OpenParen = createToken({name: "OpenParen", pattern: /\(/});
export const CloseParen = createToken({name: "CloseParen", pattern: /\)/});
export const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
});

export const allTokens = [
    // Placing WhiteSpace first as it is very common thus it will speed up the lexer
    WhiteSpace,

    // "keywords" appear before the Identifier
    Select,
    From,
    Where,
    Comma,
    STAR,

    // Identifier must appear after the keywords because all keywords are valid identifiers
    Identifier,

    OpenParen,
    CloseParen,
    Integer,
    GreaterThan,
    LessThan,
    Equal,
    Semicolon,
];

export const SelectLexer = new Lexer(allTokens);
