import {CstParser} from "chevrotain";

import {
    CloseParen,
    Comma,
    Equal,
    From,
    GreaterThan,
    Identifier,
    Integer,
    LessThan,
    OpenParen,
    STAR,
    Select,
    SelectLexer,
    Semicolon,
    Where,
    allTokens,
} from "./lexer";

class SelectParser extends CstParser {
    constructor() {
        super(allTokens);

        // Due to how the compiler organizes constructor statements, the
        // declared fields outside the constructor will be placed before any
        // additional statements after the `super` call

        this.performSelfAnalysis();
    }

    public queryStatement = this.RULE("queryStatement", () => {
        this.SUBRULE(this.selectClause);
        this.SUBRULE(this.fromClause);
        this.OPTION(() => this.SUBRULE(this.whereClause));
        this.CONSUME(Semicolon);
    });

    private selectClause = this.RULE("selectClause", () => {
        this.CONSUME(Select);
        this.OR([
            {
                ALT: () =>
                    this.AT_LEAST_ONE_SEP({
                        SEP: Comma,
                        DEF: () => {
                            this.CONSUME(Identifier);
                        },
                    }),
            },
            {ALT: () => this.CONSUME(STAR)},
        ]);
    });

    private fromClause = this.RULE("fromClause", () => {
        this.CONSUME(From);
        this.CONSUME(Identifier);
    });

    private whereClause = this.RULE("whereClause", () => {
        this.CONSUME(Where);
        this.SUBRULE(this.expression);
    });

    private expression = this.RULE("expression", () => {
        this.SUBRULE(this.atomicExpression, {LABEL: "lhs"});
        this.SUBRULE(this.relationalOperator);
        this.SUBRULE2(this.atomicExpression, {LABEL: "rhs"});
    });

    private atomicExpression = this.RULE("atomicExpression", () => {
        this.OR([
            {ALT: () => this.CONSUME(Integer)},
            {ALT: () => this.SUBRULE(this.functionExpression)},
            {ALT: () => this.CONSUME(Identifier)},
        ]);
    });

    private functionExpression = this.RULE("functionExpression", () => {
        this.CONSUME(Identifier);
        this.CONSUME(OpenParen);
        this.SUBRULE(this.atomicExpression);
        this.CONSUME(CloseParen);
    });

    private relationalOperator = this.RULE("relationalOperator", () => {
        this.OR([
            {ALT: () => this.CONSUME(Equal)},
            {ALT: () => this.CONSUME(GreaterThan)},
            {ALT: () => this.CONSUME(LessThan)},
        ]);
    });
}

const parserInstance = new SelectParser();

export function validateInput(inputText: string) {
    const lexResult = SelectLexer.tokenize(inputText);

    // ".input" is a setter which will reset the parser's internal's state.
    parserInstance.input = lexResult.tokens;

    // No semantic actions so this won't return anything yet.
    parserInstance.queryStatement();

    if (parserInstance.errors.length > 0) {
        return false;
    }

    return true;
}
