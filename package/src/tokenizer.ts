import { Keyword } from './constants/keyword'
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

    if (matched === null) {
      return null
    }
    this.cursor += matched[0].length
    return matched[0]
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
    const string = this.parser.syntax.slice(this.cursor)
    console.log(string, 'string')
    //Todo: handle this with regex later
    for (const [tokenValue, tokenType] of EdgeCaseSpecs) {
      if (tokenValue !== string) continue
      if (tokenType === null) return this.getNextToken()

      console.log('vo day')
      return {
        type: tokenType,
        value: tokenType,
        start: this.cursor,
        end: this.cursor + String(tokenValue).length
      }
    }
    for (const [regexp, tokenType] of Specs) {
      const tokenValue = this.match(regexp, string)
      if (tokenValue === null) continue
      if (tokenType === null) return this.getNextToken()

      console.log('vo day2')
      return {
        type: tokenType,
        value: tokenValue,
        start: this.cursor - String(tokenValue).length,
        end: this.cursor
      }
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`)
  }
}
