import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { Declaration } from '../declarations/index'
import { Statement } from './index'
import { Identifier } from '../identifier/index'
import { SizeArray } from '../built-in/size'

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
      case Keyword.SIZE: {
        Object.assign(this, new SizeArray(parser))
        break
      }

      default: {
        throw new SyntaxError(`Unexpected token: "${parser.nextToken?.value}"`)
      }
    }
  }
}
