import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Statement } from '.'
import { Declaration } from '../declarations'

export class StatementItem {
  constructor(parser: Parser) {
    console.log(parser.nextToken?.type, 'parser.nextToken?.type')
    switch (parser.nextToken?.type) {
      case Keyword.LET:
      case Keyword.CONST:
      case Keyword.VAR:
      case Keyword.FUNCTION: {
        Object.assign(this, new Declaration(parser))
        break
      }
      case Keyword.IDENTIFIER: {
        Object.assign(this, new Statement(parser))
        break
      }
      default: {
        throw new SyntaxError(`Unexpected token: "${parser.nextToken?.value}"`)
      }
    }
  }
}
