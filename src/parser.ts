import { Tokenizer } from './tokenizer'

export class Parser {
  _syntax: string
  _tokenizer: Tokenizer
  _nextToken: any
  constructor() {
    this._syntax = ''
    this._tokenizer = new Tokenizer(this)
    this._nextToken = this._tokenizer.getNextToken()
  }
  parse(syntax: string) {
    console.log(syntax, 'syntax')
    this._syntax = syntax
    this._tokenizer = new Tokenizer(this)
    this._nextToken = this._tokenizer.getNextToken()
    return this.Program()
    //
  }

  Program() {
    return this.NumericLiteral()
  }

  _eat(type: string) {
    const token = this._nextToken
    console.log(token, 'log token')
    if (token.type !== type) {
      throw new Error(`Unexpected token: ${token.type}`)
    }
    if (token === null) {
      throw new Error(`Unexpected end of input`)
    }
    this._nextToken = this._tokenizer.getNextToken()

    return token
  }

  NumericLiteral() {
    console.log(this._syntax, 'this._syntax')
    const token = this._eat('NUMBER')
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
      start: 0,
      end: 0
    }
  }
}
