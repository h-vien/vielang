import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { NumericLiteral } from './numeric'
import { StringLiteral } from './string'
import { BooleanLiteral } from './boolean'
import { NullLiteral } from './null'

export class Literal {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.NUMBER: {
        Object.assign(this, new NumericLiteral(parser))
        break
      }
      case Keyword.STRING: {
        Object.assign(this, new StringLiteral(parser))
        break
      }
      case Keyword.BOOLEAN: {
        Object.assign(this, new BooleanLiteral(parser))
        break
      }
      case Keyword.NULL: {
        Object.assign(this, new NullLiteral(parser))
        break
      }
    }
  }
}
