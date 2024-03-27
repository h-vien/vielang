import parser from ".."

describe('Parser', () => {
    it("should parse the program correctly", () => {
        const program = `42`
        const ast = parser.parse(program)
        expect(ast).toEqual({
            type: 'NumericLiteral',
            value: 42,
            start: 0,
            end: 0
        })
    })
})