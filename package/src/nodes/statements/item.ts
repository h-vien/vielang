import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Statement } from '.'
import { Declaration } from '../declarations'

export class StatementItem {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.LET:
      case Keyword.CONST:
      case Keyword.VAR:
      case Keyword.FUNCTION: {
        Object.assign(this, new Declaration(parser))
        break
      }
      case Keyword.IDENTIFIER:
      case Keyword.WHILE:
      case Keyword.FOR:
      case Keyword.RETURN:
      case Keyword.SWITCH:
      case Keyword.BREAK:
      case Keyword.IF:
      case '++':
      case '--': {
        Object.assign(this, new Statement(parser))
        break
      }

      default: {
        throw new SyntaxError(`Unexpected token: "${parser.nextToken?.value}"`)
      }
    }
  }
}
