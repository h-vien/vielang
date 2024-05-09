import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { BlockStatement } from './block'
import { BreakableStatement } from './breakable'
import { ExpressionStatement } from './expression'
import { IfStatement } from './if'
import { ReturnStatement } from './return'

export class Statement {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case '{': {
        Object.assign(this, new BlockStatement(parser))
        break
      }
      case Keyword.IF: {
        Object.assign(this, new IfStatement(parser))
        break
      }
      case Keyword.RETURN: {
        Object.assign(this, new ReturnStatement(parser))
        break
      }
      case Keyword.BREAK: {
        Object.assign(this, new BreakableStatement(parser))
        break
      }
      case Keyword.DO:
      case Keyword.WHILE:
      case Keyword.FOR:
      case Keyword.SWITCH: {
        Object.assign(this, new BreakableStatement(parser))
        break
      }
      default: {
        Object.assign(this, new ExpressionStatement(parser))
        break
      }
    }
  }
}
