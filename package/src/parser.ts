import { Keyword } from './constants/keyword'
import { Program } from './program'
import { Tokenizer } from './tokenizer'
import { Token } from './types/token'

export class Parser {
  syntax: string
  tokenizer: Tokenizer
  nextToken: Token | null
  constructor() {
    this.syntax = ''
    this.tokenizer = new Tokenizer(this)
    this.nextToken = null
  }

  //Overload function
  public parse(syntax: string, InitAtsNodeClass?: any): any

  parse(syntax: string) {
    //Reset the tokenizer and nextToken
    this.nextToken = null
    this.syntax = ''

    // Set the syntax and tokenizer
    this.syntax = syntax
    this.tokenizer = new Tokenizer(this)
    this.nextToken = this.tokenizer.getNextToken()
    return new Program(this)
  }

  validate(type: Token['type']) {
    const token = this.nextToken
    if (token === null) throw new SyntaxError(`Unexpected end of input, expected: "${type}`)
    if (token.type !== type) {
      if (type === Keyword.IDENTIFIER)
        throw new SyntaxError(
          `Unexpected token: "${token.value}", cannot use keyword "${token.value}" for the beginning of the identifier`
        )
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${type}"`)
    }

    this.nextToken = this.tokenizer.getNextToken()
    return token
  }
}
