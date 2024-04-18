import { Keyword } from './constants/keyword'
import { Specs } from './constants/specs'
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
    const matched = regexp.exec(syntax)

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
    if (string === 'vô giá trị') {
      return {
        type: Keyword.NULL,
        value: Keyword.NULL,
        start: this.cursor,
        end: this.cursor + 12
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
}
