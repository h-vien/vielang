import { Keyword } from '@parser/constants/keyword'
import { Literal } from '@parser/literal'
import { Parser } from '@parser/parser'

export class Expression {
  [key: string]: any

  constructor(parser: Parser) {
    switch (parser.nextToken?.type as string) {
      case Keyword.NUMBER:
      case Keyword.STRING:
      case Keyword.BOOLEAN:
      case Keyword.NAN:
      case Keyword.NULL:
      case Keyword.UNDEFINED: {
        Object.assign(this, new Literal(parser))
        break
      }
    }
  }
}
