import { EdgeCaseSpecs, Specs } from './constants/specs'
import { Parser } from './parser'
import { Token } from './types/token'

export class Tokenizer {
  private parser: Parser
  private cursor: number

  constructor(parser: Parser) {
    this.parser = parser
    this.cursor = 0
  }
  private match(regexp: RegExp, syntax: string) {
    const formattedSyntax = syntax.split(';')
    const matched = regexp.exec(formattedSyntax[0].concat(';'))
    if (matched && matched.index === 0) {
      this.cursor += matched[0].length
      return matched[0]
    }
    return null
  }

  public isEOF() {
    return this.cursor === this.parser.syntax.length
  }

  public hasMoreTokens() {
    return this.cursor < this.parser.syntax.length
  }

  public getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null
    }
    //TODO: Handle this
    if (this.parser.syntax.includes('in ra')) {
      this.parser.syntax = this.parser.syntax.replace('in ra', 'console.log')
    }
    const string = this.parser.syntax.slice(this.cursor)
    for (const [tokenValue, tokenType] of EdgeCaseSpecs) {
      const regex = /^(.*?)(?=\n)/

      // Use match method to extract the text
      const match = string.match(regex)
      const _string = match ? match[1] : string
      if (tokenValue !== _string.trim()) continue
      if (tokenType === null) return this.getNextToken()
      this.cursor += String(tokenValue).length
      return {
        type: tokenType,
        value: tokenValue,
        start: this.cursor - String(tokenValue).length,
        end: this.cursor
      }
    }
    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string)
      if (tokenValue === null) continue
      if (tokenType === null) return this.getNextToken()

      return {
        type: tokenType,
        value: tokenValue,
        start: this.cursor - String(tokenValue).length,
        end: this.cursor
      }
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`)
  }

  public hasMoreOperator() {
    // const operators = ["<", ">", "=", "!=", "===", "!=="];
    // const parts = expression.split(new RegExp(`([${operators.join("")}])`, "g"));
    const parts = this.parser.syntax.split('{')[0]
    console.log(parts)
    return /[+\-*/%<>=!&|^]+/.test(parts)
  }
}
