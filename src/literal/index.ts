import { Keyword } from '@parser/constants/keyword'
import { Parser } from '@parser/parser'
import { NumericLiteral } from './numeric'

export class Literal {
  constructor(parser: Parser) {
    switch (parser.nextToken?.type) {
      case Keyword.NUMBER: {
        Object.assign(this, new NumericLiteral(parser))
        break
      }
    }
  }
}
