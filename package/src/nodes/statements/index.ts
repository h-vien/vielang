import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { BlockStatement } from './block'
import { ExpressionStatement } from './expression'
import { ForStatement } from './breakable/iteration/for'
import { IfStatement } from './if'
import { ReturnStatement } from './return'
import { BreakableStatement } from './breakable'

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
        console.log('go here?')
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
