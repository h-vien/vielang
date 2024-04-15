import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { NumericLiteral } from './numeric'
import { StringLiteral } from './string'

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
    }
  }
}
