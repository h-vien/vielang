import { Parser } from './parser'
import { Tokenizer } from './tokenizer'

class SingleNodeParser extends Parser {
  parse(syntax: string, InitAtsNodeClass: any) {
    this.nextToken = null
    this.syntax = ''

    this.syntax = syntax
    this.tokenizer = new Tokenizer(this)

    this.nextToken = this.tokenizer.getNextToken()

    return new InitAtsNodeClass(this)
  }
}

export const parserNode = new SingleNodeParser()
